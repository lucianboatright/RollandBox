import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PropTypes from 'prop-types';
import ImageCrop from './imageCrop';
import { firebase, storage } from '../../lib/firebase';
// import app from '../../lib/firebaseStorage';

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

// function generateDownload(upImg, completedCrop) {
//   console.log('anything');
//   if (!completedCrop || !upImg) {
//     return;
//   }
//   upImg.toBlob((blob) => {
//     console.log('BLOB GEN DOWNLOAD', blob);
//     console.log('inside toBlob', completedCrop);
//     return blob;
//   });
// }

export default function Modal({ open, onClose, profile, watchesCount, userId }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 10 / 16 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [watchName, setWatchName] = useState(null);
  const [watchInfo, setWatchInfo] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [url, setUrl] = useState('');
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
    console.log('TESTTT', previewCanvasRef.current, completedCrop);
    console.log('completed crop', completedCrop);
    console.log('completed blob', imageBlob);
    const test = generateDownload(previewCanvasRef.current, completedCrop);
    console.log('TEST END', test);
  };

  const handleSubmitUpload = (e) => {
    const metadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        watchname: watchName,
        watchinfo: watchInfo,
        profilename: profile,
        usernumber: userId
      }
    };
    const file = imageBlob;
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`watches/${watchName}.jpg`).put(file, metadata);
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
          .ref('watches')
          .child(`${watchName}.jpg`)
          .getDownloadURL()
          .then((url) => {
            db.collection('watches').add({
              watchname: watchName,
              watchinfo: watchInfo,
              imageurl: url,
              comments: [],
              likes: [],
              userId
            });
            setProgress(0);
            setWatchInfo('');
            setWatchInfo('');
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
                <p>Adding Another Watch {profile}?</p>
                <p>Collection total is {watchesCount} Watches</p>
              </div>
            </div>
            <form onSubmit={handleSubmitUpload} method="POST">
              <div className="App">
                <div className="rounded bg-gradient-to-r from-green-400 to-blue-500 w-60 bg mt-1 mb-1 pl-1 pr-1 pt-1 pb-1">
                  <input
                    className="m-2 w-60"
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                  />
                </div>
                <div className="flex justify-center ml-0 h-26 w-2/3">
                  <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
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
                <button
                  type="button"
                  className="rounded mt-2 mb-1 pl-2 pr-2 pt-1 pb-1 w-60 bg-gradient-to-r from-green-400 to-blue-500 w-60 bg"
                  disabled={!completedCrop?.width || !completedCrop?.height}
                  onClick={imageBlobGenerater}
                >
                  Download cropped image
                </button>
                <div>
                  <span className="text-xs align-top pr-4">Progress</span>
                  <progress className="" value={progress} max="100" />
                </div>
              </div>
              <p>Watch Name</p>
              <input
                className="border-solid border-2 border-light-blue-500 w-60"
                type="text"
                onChange={({ target }) => setWatchName(target.value)}
              />
              <br />
              <p>Enter any information or links below</p>
              <textarea
                id="watchinfo"
                onChange={({ target }) => setWatchInfo(target.value)}
                className="border-2 border-grey-500 focus:border-black-900 w-60"
                rows="4"
                cols="50"
                placeholder="Enter text"
              >
                Enter text
              </textarea>
              <input
                type="submit"
                className="rounded mt-1 mb-1 pl-2 pr-2 pt-1 pb-1 bg-gradient-to-r from-green-400 to-blue-500 w-60 bg"
              />
            </form>
            <br />
            <img src={completedCrop} alt="" />
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
  profile: PropTypes.string,
  userId: PropTypes.string
};
