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
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const imageBlobGenerater = async (e) => {
    const metadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        watchname: watchName,
        watchinfo: watchInfo,
        profilename: profile,
        usernumber: userId
      }
    };
    const file = image;
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
              // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              watchname: watchName,
              watchinfo: watchInfo,
              imageurl: url,
              userid: userId,
              likes: []
            });
            setProgress(0);
            setWatchInfo('');
            setWatchInfo('');
            setImage(null);
            console.log('complete', url);
          });
      }
    );
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('onclick', watchName, watchInfo);
  //   onClose(e);
  // };

  const handleSubmitUpload = (e) => {
    e.preventDefault();
    // const metadata = {
    //   contentType: 'image/jpeg',
    //   customMetadata: {
    //     watchname: watchName,
    //     watchinfo: watchInfo,
    //     profilename: profile,
    //     usernumber: userId
    //   }
    // };
    // const file = imageBlob;
    // const storageRef = firebase.storage().ref();
    // const fileRef = storageRef.child(`watches/${watchName}.jpg`);
    // await fileRef.put(file, metadata);
    // setUrl(await fileRef.getDownloadURL());
    console.log('UURRLL', url);
    onClose();
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

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
            <form onSubmit={handleSubmitUpload} method="POST">
              <div className="App">
                <div className="justify-around ml-0 h-26 w-2/3 flex items-start">
                  <input type="file" onChange={handleChange} />
                </div>
                <button
                  type="button"
                  className="rounded border-solid border-2 border-light-blue-600 mt-8 mb-1 pl-2 pr-2 pt-1 pb-1"
                  onClick={imageBlobGenerater}
                >
                  Download cropped image
                </button>
              </div>
              <progress className="" value={progress} max="100" />
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
            <img src={completedCrop} alt="" />
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
  profile: PropTypes.string,
  userId: PropTypes.string
};
