import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactCrop from 'react-image-crop';
import { firebase } from '../../lib/firebase';
import rightArrow from '../../images/svg_png/arrowRight.png';
import leftArrow from '../../images/svg_png/arrowLeft.png';
import loading from '../../images/svg_png/loading.png';
import correct from '../../images/svg_png/correct.png';

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
  // console.log('docId', documentId);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [imagedownload, setImageDownload] = useState(false);
  const [downloadAtempt, setDownloadAtempt] = useState(false);
  const [fileDownload, setFileDownload] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [progress, setProgress] = useState(0);
  const [uploadingWatch, setUploadingWatch] = useState(false);

  const generateDownload = (upImg, completedCrop) => {
    // console.log('anything');
    if (!completedCrop || !upImg) {
      return;
    }
    upImg.toBlob((blob) => {
      setImageBlob(blob);
      // console.log('end', imageBlob);
      if (imageBlob === null) {
        setImageDownload(false);
      } else {
        setImageDownload(true);
      }
    });
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
      setFileDownload(true);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSubmitUpload = () => {
    setUploadingWatch(true);
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
            setImageBlob(null);
            // console.log('complete', url);
          });
      }
    );
  };

  const imageBlobGenerater = async () => {
    generateDownload(previewCanvasRef.current, completedCrop);
    setDownloadAtempt(true);
  };

  const closeModal = () => {
    setImageBlob(null);
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
    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    // ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'low';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES}>
        <button
          type="button"
          onClick={closeModal}
          style={{ fontFamily: 'Acakadut' }}
          className="text-white bg-gradient-to-r from-red-600 to-blue-500 rounded px-2 py-0.5 hover:bg-white-600 hover:text-red"
        >
          X Close Modal
        </button>
        <div style={MODAL_STYLES} className="rounded">
          <div className="overflow-y-scroll h-90">
            <div className="flex items-stretch">
              <div className="justify-left pb-2">
                {/* <img className="rounded-full h-12 mr-2" src={userAvatar} alt={profile} /> */}
              </div>
              <div className="justify-left capitalize" style={{ fontFamily: 'Quinngothic' }}>
                <p>Hello {profile}</p>
                <p>Download your Avitar</p>
              </div>
            </div>
            <div className="App">
              {fileDownload === false ? (
                <div
                  className="pt-1 text-center w-60 h-10 text-white"
                  style={{ backgroundColor: '#c0362c' }}
                >
                  <img alt="logo" src={rightArrow} className="animate-pulse h-8 w-8 mr-3 inline" />
                  <button onClick={handleClick} type="button" style={{ fontFamily: 'Acakadut' }}>
                    Browse Files for Upload ...
                  </button>
                  <input
                    className="m-2 w-48"
                    style={{ display: 'none' }}
                    ref={hiddenFileInput}
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                  />
                </div>
              ) : (
                <div
                  style={{ backgroundColor: '#c0362c' }}
                  className="pt-1 text-center w-60 h-10 text-white rounded"
                >
                  <button onClick={handleClick} type="button" style={{ fontFamily: 'Acakadut' }}>
                    Browse Files for Upload ...
                  </button>
                  <input
                    className="m-2 w-48"
                    style={{ display: 'none' }}
                    ref={hiddenFileInput}
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                  />
                </div>
              )}
              <div className="flex justify-center ml-0 pt-2 h-26 w-2/3">
                <ReactCrop
                  src={upImg}
                  onImageLoaded={onLoad}
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  style={{ height: '10rem', width: '15rem' }}
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
              {imagedownload === false ? (
                <>
                  <div>
                    {fileDownload === false ? (
                      <>
                        <span />
                      </>
                    ) : (
                      <button
                        type="button"
                        className="rounded mt-2 mb-1 pl-2 pr-2 pt-1 pb-1 w-60 text-white w-60 bg"
                        disabled={!completedCrop?.width || !completedCrop?.height}
                        onClick={imageBlobGenerater}
                        style={{ fontFamily: 'Acakadut', backgroundColor: '#c0362c' }}
                      >
                        <img
                          alt="logo"
                          src={rightArrow}
                          className="animate-pulse h-8 w-8 mr-3 inline"
                        />
                        Upload Image
                      </button>
                    )}
                  </div>
                  <div>
                    {downloadAtempt === true ? (
                      <>
                        <div>
                          {imagedownload === false ? (
                            <>
                              <div
                                style={{ fontFamily: 'Acakadut' }}
                                className="rounded mb-1 pl-2 pr-2 pt-1 pb-1 w-60 text-red-700 inline-block align-middle"
                              >
                                <img
                                  alt="logo"
                                  src={loading}
                                  className="animate-spin h-6 w-6 mr-3 inline"
                                />
                                <span className="inline">Please Try Again in a Moment</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                style={{ fontFamily: 'Acakadut' }}
                                className="rounded mb-1 pl-2 pr-2 pt-2 w-60 text-green-900"
                              >
                                <img alt="logo" src={correct} className="h-8 w-8 mr-3 inline" />
                                <span className="inline">Ready To Upload</span>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <span />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {uploadingWatch === false ? (
                    <div>
                      <button
                        type="button"
                        onClick={handleSubmitUpload}
                        style={{ fontFamily: 'Acakadut', backgroundColor: '#c0362c' }}
                        className="rounded mt-3 text-xl mb-1 pr-2 pt-1 pb-1 w-60 text-white w-60 bg"
                      >
                        <img
                          alt="logo"
                          src={rightArrow}
                          className="animate-pulse h-8 w-8 mr-3 inline"
                        />
                        Upload
                        <img
                          alt="logo"
                          src={leftArrow}
                          className="animate-pulse h-8 w-8 ml-3 inline"
                        />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <div>
                          <p
                            style={{ fontFamily: 'Acakadut' }}
                            className="rounded mb-0 pl-2 pr-2 pt-2 pb-1 w-60 text-red-700 inline-block align-middle"
                          >
                            Uploading Please wait
                          </p>
                        </div>
                        <div>
                          <progress
                            value={progress}
                            max="100"
                            className="mt-2 border rounded w-48 mr-1"
                          />
                          <img
                            alt="logo"
                            src={loading}
                            className="animate-spin h-6 w-6 mr-3 ml-2 inline mb-2"
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={closeModal}
                          style={{ fontFamily: 'Acakadut', backgroundColor: '#c0362c' }}
                          className="rounded mt-3 text-xl mb-1 pr-2 pt-1 pb-1 w-60 text-white w-60 bg"
                        >
                          <img
                            alt="logo"
                            src={rightArrow}
                            className="animate-pulse h-8 w-8 mr-3 inline"
                          />
                          Complete
                          <img
                            alt="logo"
                            src={leftArrow}
                            className="animate-pulse h-8 w-8 ml-3 inline"
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
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
