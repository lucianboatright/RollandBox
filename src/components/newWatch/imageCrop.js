import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Uploady, { withRequestPreSendUpdate, useItemFinalizeListener } from '@rpldy/uploady';
import { getMockSenderEnhancer } from '@rpldy/mock-sender';
import UploadButton from '@rpldy/upload-button';
import UploadPreview, { PREVIEW_TYPES } from '@rpldy/upload-preview';
import cropImage from './cropImage';
import './styles.css';

const StyledReactCrop = styled(ReactCrop)`
  width: 100%;
  max-width: 900px;
  height: 400px;
`;

const PreviewImage = styled.img`
  margin: 5px;
  max-width: 200px;
  height: auto;
  max-height: 200px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const PreviewButtons = (props) => {
  const { finished, crop, updateRequest, onUploadCancel, onUploadCrop } = props;

  return (
    <ButtonsWrapper>
      <button
        type="button"
        style={{
          display: !finished && updateRequest && crop ? 'block' : 'none'
        }}
        onClick={onUploadCrop}
      >
        Upload Cropped
      </button>
      <button
        type="button"
        style={{ display: !finished && updateRequest ? 'block' : 'none' }}
        onClick={updateRequest}
      >
        Upload without Crop
      </button>
      <button
        type="button"
        style={{
          display: !finished && updateRequest && crop ? 'block' : 'none'
        }}
        onClick={onUploadCancel}
      >
        Cancel
      </button>
    </ButtonsWrapper>
  );
};

const ItemPreviewWithCrop = withRequestPreSendUpdate((props) => {
  const { id, url, isFallback, type, updateRequest, requestData, previewMethods } = props;
  const [finished, setFinished] = useState(false);
  const [crop, setCrop] = useState(null);

  useItemFinalizeListener(() => {
    setFinished(true);
  }, id);

  const onUploadCrop = useCallback(async () => {
    if (updateRequest && (crop?.height || crop?.width)) {
      requestData.items[0].file = await cropImage(url, requestData.items[0].file, crop);
      updateRequest({ items: requestData.items });
    }
  }, [url, requestData, updateRequest, crop]);

  const onUploadCancel = useCallback(() => {
    updateRequest(false);
    if (previewMethods.current?.clear) {
      previewMethods.current.clear();
    }
  }, [updateRequest, previewMethods]);

  return isFallback || type !== PREVIEW_TYPES.IMAGE ? (
    <PreviewImage src={url} alt="fallback img" />
  ) : (
    <>
      {requestData && !finished ? (
        <StyledReactCrop src={url} crop={crop} onChange={setCrop} onComplete={setCrop} />
      ) : (
        <PreviewImage src={url} alt="uploading img" />
      )}
      <PreviewButtons
        finished={finished}
        crop={crop}
        updateRequest={updateRequest}
        onUploadCancel={onUploadCancel}
        onUploadCrop={onUploadCrop}
      />
      <p>{finished ? 'FINISHED' : ''}</p>
    </>
  );
});

const mockSenderEnhancer = getMockSenderEnhancer({ delay: 1500 });

export default function ImageCrop() {
  const previewMethodsRef = useRef();

  return (
    <Uploady destination={{ url: '[upload-url]' }} enhancer={mockSenderEnhancer}>
      <div className="App">
        <h1>Hello React Uploady</h1>
        <UploadButton>Upload Files</UploadButton>
        <br />
        <UploadPreview
          PreviewComponent={ItemPreviewWithCrop}
          previewComponentProps={{ previewMethods: previewMethodsRef }}
          previewMethodsRef={previewMethodsRef}
          fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg"
        />
      </div>
    </Uploady>
  );
}

ImageCrop.propTypes = {
  finished: PropTypes
}
