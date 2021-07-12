import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import PropTypes from 'prop-types';
import ImageCrop from './imageCrop';
import { firebase, storage, FieldValue } from '../../lib/firebase';
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

export default function Modal({ open, onClose, profile, watchesCount, userId }) {
  const [watchName, setWatchName] = useState('');
  const [watchInfo, setWatchInfo] = useState('');
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`watches/${watchName}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytes.Transferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.messgae);
      },
      () => {
        storage
          .ref('watches')
          .child(`${watchName}${userId}`)
          .getDownloadURL()
          .then((url) => {
            FieldValue.collection('watches').add({
              // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              watchname: watchName,
              watchinfo: watchInfo,
              imageurl: url,
              userid: userId
            });
            setProgress(0);
            setWatchInfo('');
            setImage(null);
            console.log('complete', url);
          });
      }
    );
    onClose(e);
  };

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
            <input
              type="text"
              placeholder="Enter name of watch..."
              onChange={(event) => setWatchName(event.target.value)}
              vaule={watchName}
            />
            <textarea value={watchInfo} onChange={(event) => setWatchInfo(event.target.value)} />
            <input type="file" onChange={handleChange} />
            <input type="submit" onClick={handleUpload} />
            <progress value={progress} max="100" />
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
