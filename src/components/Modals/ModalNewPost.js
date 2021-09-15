import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PropTypes from 'prop-types';
import { firebase } from '../../lib/firebase';
import loading from '../../images/svg_png/loading.png';
import correct from '../../images/svg_png/correct.png';
import leftArrow from '../../images/svg_png/arrowLeft.png';
import rightArrow from '../../images/svg_png/arrowRight.png';

const db = firebase.firestore();

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '40px',
  width: 'auto'
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
  const [crop, setCrop] = useState({ unit: '%', width: 250, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [watchPost, setPostInfo] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [imagedownload, setImageDownload] = useState(false);
  const [downloadAtempt, setDownloadAtempt] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const hiddenFileInput = React.useRef(null);
  const [progress, setProgress] = useState(0);
  const [completeUpload, setCompleteUpload] = useState(false);

  const today = new Date();
  const time =
    today.getMonth() *
    today.getFullYear() *
    today.getHours() *
    today.getMinutes() *
    today.getSeconds();

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

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleSubmitUpload = () => {
    const metadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        watchpost: watchPost,
        profilename: profile,
        usernumber: userId
      }
    };
    const file = imageBlob;
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`posts/${profile}${time}.jpg`).put(file, metadata);
    // setUrl(await fileRef.getDownloadURL());
    fileRef.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        console.log('THIS ERRORR IS HAPPENING!!!');
        alert(error.messgae);
      },
      () => {
        firebase
          .storage()
          .ref('posts')
          .child(`${profile}${time}.jpg`)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              watchpost: watchPost,
              imageurl: url,
              comments: [],
              likes: [],
              userId
            });
            setPostInfo('');
            setImageBlob(null);
            console.log('complete', url);
            setCompleteUpload(true);
          });
      }
    );
  };

  const imageBlobGenerater = async () => {
    generateDownload(previewCanvasRef.current, completedCrop);
    setDownloadAtempt(true);
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const closeModal = (e) => {
    e.preventDefault();
    setPostInfo(null);
    setImageBlob(null);
    onClose();
  };

  const text = 'Description: \nWatch:';

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
          className="text-white bg-gradient-to-r from-red-600 to-blue-500 rounded px-2 py-0.5 hover:bg-white-600 hover:text-red"
        >
          X Close Modal
        </button>
        <div style={MODAL_STYLES} className="rounded">
          <div className="overflow-y-scroll" style={{ height: '28rem' }}>
            <form onSubmit={closeModal} method="POST">
              <div className="flex flex-col sm:flex-row md:flex-row :lg:flex-row xl:flex-row">
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
                      <p style={{ fontSize: '1rem', color: 'rgb(0,15,85)' }}>
                        Adding A Post {profile}?
                      </p>
                      {/* <p style={{ fontSize: '0.8rem' }}>Current total is {watchesCount} Watches</p> */}
                    </div>
                  </div>
                  <div className="App w-96">
                    <div className="w-60 mt-1 mb-1 pr-1 pt-1 pb-1">
                      {fileSelected === false ? (
                        <>
                          <div
                            style={{ backgroundColor: 'rgb(128,0,0)' }}
                            className="pt-1 text-center w-34 h-10 text-white rounded"
                          >
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
                          <div className="pt-1 text-center w-34 h-10 rounded border-2 ">
                            <button
                              onClick={handleClick}
                              type="button"
                              style={{ fontFamily: 'Acakadut', color: 'rgb(128,0,0)' }}
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
                    <div className="flex justify-left ml-0 h-60 mb-3">
                      <ReactCrop
                        src={upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                        style={{ height: 'auto', width: '10rem' }}
                        className=""
                      />
                      <div style={{ height: '10', marginLeft: '1rem' }}>
                        <canvas
                          className=""
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
                                className="rounded mt-3 mb-1 pl-2 pr-2 pt-1 pb-1 w-60 text-xl text-white"
                                disabled={!completedCrop?.width || !completedCrop?.height}
                                onClick={imageBlobGenerater}
                                style={{ fontFamily: 'Acakadut', backgroundColor: 'rgb(128,0,0)' }}
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
                                  style={{ fontFamily: 'Quinngothic' }}
                                  className="rounded mb-1 pl-2 pr-2 pt-1 pb-1 w-60 text-red-700 inline-block align-middle"
                                >
                                  <img
                                    alt="logo"
                                    src={loading}
                                    className="animate-spin h-6 w-6 mr-3 inline"
                                  />
                                  <span className="inline">Please Try Dwonload Again</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div
                                  style={{ fontFamily: 'Quinngothic' }}
                                  className="rounded mb-1 pl-2 pr-2 pt-2 w-60 text-green-900"
                                >
                                  <img alt="logo" src={correct} className="h-8 w-8 mr-1 inline" />
                                  <span className="inline">File Selected</span>
                                </div>
                                <span
                                  className="ml-11 text-green-900 text-xl"
                                  style={{ fontFamily: 'Quinngothic' }}
                                >
                                  Add Watch Information
                                </span>
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
                <div className="flex flex-col">
                  <p className="text-blue-600 pl-1 pt-0.5" style={{ fontFamily: 'Quinngothic' }}>
                    Image description
                  </p>
                  <textarea
                    id="watchPost"
                    onChange={({ target }) => setPostInfo(target.value)}
                    className="border-2 border-grey-500 focus:border-black-900 w-60"
                    rows="8"
                    cols="50"
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {text}
                  </textarea>
                  <progress value={progress} max="100" className="mt-2 border rounded w-60" />
                  {imagedownload === false ? (
                    <>
                      <input
                        style={{ fontFamily: 'Acakadut', backgroundColor: 'rgb(128,0,0)' }}
                        type="submit"
                        value="Add Watch"
                        className="rounded mt-1 mb-1 pl-2 pr-2 pt-1 pb-1 text-red-900 text-xl w-60 bg"
                      />
                    </>
                  ) : (
                    <>
                      <div>
                        {completeUpload === false ? (
                          <button
                            type="button"
                            onClick={handleSubmitUpload}
                            style={{ fontFamily: 'Acakadut', backgroundColor: 'rgb(128,0,0)' }}
                            className="rounded mt-1 mb-1 pr-0 pt-1 pb-1 text-white text-2xl w-60 bg"
                          >
                            <img
                              alt="logo"
                              src={rightArrow}
                              className="animate-pulse h-8 w-8 mr-1 inline"
                            />
                            Information Added
                            <img
                              alt="logo"
                              src={leftArrow}
                              className="animate-pulse h-8 w-8 ml-1 inline"
                            />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            style={{ fontFamily: 'Acakadut', backgroundColor: 'rgb(128,0,0)' }}
                            className="rounded mt-1 mb-1 pr-2 pt-1 pb-1 text-white text-xl w-60 bg"
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
                        )}
                      </div>
                    </>
                  )}
                </div>
                <img src={completedCrop} alt="" />
              </div>
            </form>
            <br />
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
