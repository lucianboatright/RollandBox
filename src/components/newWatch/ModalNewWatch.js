import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PropTypes from 'prop-types';
import ImageCrop from './imageCrop';
import Imageform from './imageform';
// import app from '../../lib/firebaseStorage';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px'
  // zIndex: 1000
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
};

function generateDownload(canvas, crop) {
  console.log('anything');
  if (!crop || !canvas) {
    return;
  }
  canvas.toBlob((blob) => {
    // const previewUrl = window.URL.createObjectURL(blob);
    // const anchor = document.createElement('a');
    // anchor.download = 'cropPreview.png';
    // anchor.href = URL.createObjectURL(blob);
    // anchor.click();
    // window.URL.revokeObjectURL(previewUrl);
    console.log(blob);
  });
}

// function handleSubmit(event) {
//   event.preventDefault();
//   // generateDownload(previewCanvasRef.current, completedCrop);
//   // console.log('onclick', watchName, watchInfo);
// }

export default function Modal({ open, onClose, profile, watchesCount }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 10 / 16 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [watchName, setWatchName] = useState(null);
  const [watchInfo, setWatchInfo] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateDownload(previewCanvasRef.current, completedCrop);
    console.log('onclick', watchName, watchInfo);
    onClose(e);
  };

  const handleSubmitUpload = (e) => {
    console.log('File uploaded');
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  // const closeButton = (e) => {
  //   () => generateDownload(previewCanvasRef.current, completedCrop);
  //   console.log('onclick', watchName, watchInfo);
  //   onClose;
  // };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <div className="overflow-y-scroll h-80">
            <div className="flex items-stretch">
              <div className="justify-left">
                <img
                  className="rounded-full h-12 mr-2"
                  src={`/images/avatars/${profile}.jpg`}
                  alt={profile}
                />
              </div>
              <div className="justify-left">
                <p>Hello {profile}</p>
                <p>You currently have {watchesCount} watches</p>
              </div>
            </div>
            <br />
            <form onSubmit={handleSubmit} method="POST">
              <div className="App">
                <div>
                  <input className="m-2" type="file" accept="image/*" onChange={onSelectFile} />
                </div>
                <div className="justify-around ml-0 h-26 w-2/3 flex items-start">
                  <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    style={{ height: '200px', width: '150px' }}
                    className=""
                  />
                  <div style={{ height: '100px', width: '100px', margin: '10px' }}>
                    <canvas
                      ref={previewCanvasRef}
                      // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                      style={{
                        width: Math.round(completedCrop?.width ?? 0),
                        height: Math.round(completedCrop?.height ?? 0)
                      }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded border-solid border-2 border-light-blue-600 mt-8 mb-1 pl-2 pr-2 pt-1 pb-1"
                  disabled={!completedCrop?.width || !completedCrop?.height}
                  onClick={handleSubmitUpload}
                >
                  Download cropped image
                </button>
              </div>
              <p>Watch Name</p>
              <input
                className="border-solid border-2 border-light-blue-500"
                type="text"
                onChange={({ target }) => setWatchName(target.value)}
              />
              <br />
              {/* <p>Upload Image</p>
              <input type="file" /> */}
              <p>Enter any information or links below</p>
              <input
                className="border-solid border-2 border-light-blue-500"
                type="text"
                style={{ height: '270px' }}
                onChange={({ target }) => setWatchInfo(target.value)}
              />
              <input type="submit" />
            </form>
            <br />
            {/* <button
              type="button"
              // onClick={
              //   (() => generateDownload(previewCanvasRef.current, completedCrop),
              //   console.log('onclick', watchName, watchInfo),
              //   onClose)
              // }
              className="border-solid border-2 rounded-md border-light-blue-500 p-1"
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  watchesCount: PropTypes.number.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.bool,
  profile: PropTypes.string
};
