import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import { firebase } from '../../lib/firebase';

const db = firebase.firestore();

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

export default function Modal({ open, onClose, profile, userId, documentId }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [progress, setProgress] = useState(0);

  const generateDownload = (upImg, completedCrop) => {
    console.log('anything');
    if (!completedCrop || !upImg) {
      return;
    }
    upImg.toBlob((blob) => {
      setImageBlob(blob);
      console.log('end', imageBlob);
    });
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const imageBlobGenerater = async (e) => {
    generateDownload(previewCanvasRef.current, completedCrop);
  };

  const handleSubmitUpload = (e) => {
    // generateDownload(previewCanvasRef.current, completedCrop);
    const metadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        profilename: profile,
        usernumber: userId
      }
    };
    const file = imageBlob;
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`avatars/${profile}.jpg`).put(file, metadata);
    // setUrl(await fileRef.getDownloadURL());
    fileRef.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.messgae);
      },
      () => {
        firebase
          .storage()
          .ref('avatars')
          .child(`${profile}.jpg`)
          .getDownloadURL()
          .then((url) => {
            db.collection('users').doc(documentId).update({
              imageurl: url
            });
            setProgress(0);
            setImageBlob(null);
            console.log('complete', url);
          });
      }
    );
    onClose();
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

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
                <p>Select and crop for your Avitar</p>
              </div>
            </div>
            <div className="App">
              <div className="rounded bg-gradient-to-r from-green-400 to-blue-500 w-60 bg mt-1 mb-1 pl-1 pr-1 pt-1 pb-1">
                <input className="m-2 w-60" type="file" accept="image/*" onChange={onSelectFile} />
              </div>
              <div className="flex justify-center ml-0 h-26 w-2/3">
                <ReactCrop
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={((c) => setCrop(c), (c) => setCompletedCrop(c))}
                  // onComplete={(c) => setCompletedCrop(c)}
                  style={{ height: 'auto', width: '8rem' }}
                  className=""
                />
                <div style={{ height: 'auto', width: '8rem', marginLeft: '1rem' }}>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      width: Math.round(completedCrop?.width ?? 0),
                      height: Math.round(completedCrop?.height ?? 0)
                    }}
                  />
                </div>
              </div>
              <div>
                <span className="text-xs align-top pr-4">Progress</span>
                <progress className="" value={progress} max="100" />
              </div>
              <div>
                <button
                  type="button"
                  className="rounded mt-3 mb-1 pl-2 pr-2 pt-1 pb-1 w-60 bg-gradient-to-r from-green-400 to-blue-500 w-60 bg"
                  disabled={!completedCrop?.width || !completedCrop?.height}
                  onClick={imageBlobGenerater}
                >
                  Upload Image
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="rounded mt-3 mb-1 pl-2 pr-2 pt-1 pb-1 w-60 bg-gradient-to-r from-green-400 to-blue-500 w-60 bg"
                  disabled={!completedCrop?.width || !completedCrop?.height}
                  onClick={handleSubmitUpload}
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  documentId: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.bool,
  profile: PropTypes.string,
  userId: PropTypes.string
};
