import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PropTypes from 'prop-types';
import { firebase } from '../../lib/firebase';
import loading from '../../images/svg_png/loading.png';
import correct from '../../images/svg_png/correct.png';
import leftArrow from '../../images/svg_png/left-arrow.png';
import rightArrow from '../../images/svg_png/right-arrow.png';

const db = firebase.firestore();

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px'
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

export default function Modal({ open, onClose, profile, watchesCount, userId, userAvatar }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 250, aspect: 10 / 16 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [watchName, setWatchName] = useState(null);
  const [watchInfo, setWatchInfo] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [imagedownload, setImageDownload] = useState(false);
  const [downloadAtempt, setDownloadAtempt] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [progress, setProgress] = useState(0);

  console.log('TEST OF OPENING', fileSelected);

  const generateDownload = (upImg, completedCrop) => {
    console.log('anything');
    if (!completedCrop || !upImg) {
      return;
    }
    upImg.toBlob((blob) => {
      setImageBlob(blob);
      console.log('end', imageBlob);
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
      setFileSelected(true);
    }
  };

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const imageBlobGenerater = async (e) => {
    generateDownload(previewCanvasRef.current, completedCrop);
    setDownloadAtempt(true);
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
            setWatchName('');
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

  const closeModal = (e) => {
    e.preventDefault();
    setProgress(0);
    setWatchInfo('');
    setWatchName('');
    setImageBlob(null);
    onClose();
  };

  const text = 'Info: \nManufacturer:  \nMovment: \nCase Size: \nCase Material: \nYear: \nLink:';

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
    ctx.imageSmoothingEnabled = true;
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
        <button
          type="button"
          onClick={closeModal}
          className="text-white bg-gradient-to-r from-red-600 to-blue-500 rounded px-2 py-0.5 hover:bg-white-600 hover:text-red"
        >
          X Close Modal
        </button>
        <div style={MODAL_STYLES}>
          <div className="overflow-y-scroll h-80">
            <form onSubmit={handleSubmitUpload} method="POST">
              <div className="flex items-start">
                <div>
                  <div className="flex items-stretch">
                    <div className="justify-left">
                      <img
                        className="rounded-full h-10 mr-2 ml-1 mt-1"
                        src={userAvatar}
                        alt={profile}
                      />
                    </div>
                    <div
                      className=" mt-1.5 justify-left capitalize"
                      style={{ fontFamily: 'Quinngothic' }}
                    >
                      <p style={{ fontSize: '0.8rem' }}>Adding Another Watch {profile}?</p>
                      <p style={{ fontSize: '0.8rem' }}>Current total is {watchesCount} Watches</p>
                    </div>
                  </div>
                  <div className="App">
                    <div className="w-60 mt-1 mb-1 pr-1 pt-1 pb-1">
                      {fileSelected === false ? (
                        <>
                          <div className="pt-1 text-center w-34 h-10 text-green-900 rounded bg-gradient-to-r from-green-400 to-yellow-500">
                            <img
                              alt="logo"
                              src={rightArrow}
                              className="animate-pulse h-8 w-8 mr-3 inline"
                            />
                            <button
                              onClick={handleClick}
                              type="button"
                              style={{ fontFamily: 'Acakadut' }}
                            >
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
                        </>
                      ) : (
                        <>
                          <div className="pt-1 text-center w-34 h-10 text-white rounded bg-gradient-to-r from-green-400 to-yellow-500">
                            <button
                              onClick={handleClick}
                              type="button"
                              style={{ fontFamily: 'Acakadut' }}
                            >
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
                        </>
                      )}
                    </div>
                    <div className="flex justify-center ml-1 h-26 w-2/3">
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
                    <div>
                      {imagedownload === false ? (
                        <>
                          {fileSelected === false ? (
                            <>
                              <span />
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="rounded mt-3 mb-1 pl-2 pr-2 pt-1 pb-1 w-60 bg-gradient-to-r from-green-400 to-yellow-500 text-xl text-green-800"
                                disabled={!completedCrop?.width || !completedCrop?.height}
                                onClick={imageBlobGenerater}
                                style={{ fontFamily: 'Acakadut' }}
                              >
                                <img
                                  alt="logo"
                                  src={rightArrow}
                                  className="animate-pulse h-8 w-8 mr-5 inline"
                                />
                                Download Image
                              </button>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <span />
                        </>
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
                                    // viewBox="0 0 24 24"
                                  />
                                  <span className="inline">Please Try Again</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{ fontFamily: 'Acakadut' }}
                                  className="rounded mb-1 pl-2 pr-2 pt-2 w-60 text-green-900"
                                >
                                  <img
                                    alt="logo"
                                    src={correct}
                                    className="h-8 w-8 mr-3 inline"
                                    // viewBox="0 0 24 24"
                                  />
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
                  </div>
                </div>
                <div className="mt-0">
                  <p className="text-blue-600 pl-1" style={{ fontFamily: 'Quinngothic' }}>
                    Watch Name
                  </p>
                  <input
                    className="border-solid border-2 border-light-blue-500 w-60"
                    type="text"
                    onChange={({ target }) => setWatchName(target.value)}
                  />
                  <br />
                  <p className="text-blue-600 pl-1 pt-0.5" style={{ fontFamily: 'Quinngothic' }}>
                    Enter Iinformation and Links
                  </p>
                  <textarea
                    id="watchinfo"
                    onChange={({ target }) => setWatchInfo(target.value)}
                    className="border-2 border-grey-500 focus:border-black-900 w-60"
                    rows="8"
                    cols="50"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {text}
                  </textarea>
                  {imagedownload === false ? (
                    <>
                      <input
                        style={{ fontFamily: 'Acakadut' }}
                        type="submit"
                        value="Add Watch"
                        className="rounded mt-1 mb-1 pl-2 pr-2 pt-1 pb-1 bg-gradient-to-r from-yellow-500 to-green-400 text-red-700 text-xl w-60 bg"
                      />
                    </>
                  ) : (
                    <>
                      <button
                        type="submit"
                        style={{ fontFamily: 'Acakadut' }}
                        className="rounded mt-1 mb-1 pr-2 pt-1 pb-1 bg-gradient-to-r from-yellow-500 to-green-400 text-green-800 text-xl w-60 bg"
                      >
                        <img
                          alt="logo"
                          src={rightArrow}
                          className="animate-pulse h-8 w-8 mr-5 inline"
                        />
                        Add Watch
                      </button>
                    </>
                  )}
                </div>
              </div>
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
  userId: PropTypes.string,
  userAvatar: PropTypes.string
};
