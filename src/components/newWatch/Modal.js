import React from 'react';
import PropTypes from 'prop-types';
import ImageCrop from './imageCrop';

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

export default function Modal({ open, onClose, profile, watchesCount }) {
  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <p>Hello {profile}</p>
          <p>You currently have {watchesCount} watches</p>
          <br />
          <form>
            <ImageCrop />
            <p>Watch Name</p>
            <input className="border-solid border-2 border-light-blue-500" type="text" />
            <br />
            <p>Upload Image</p>
            <input type="file" />
            <p>Enter any information or links below</p>
            <input
              className="border-solid border-2 border-light-blue-500"
              type="text"
              style={{ height: '270px' }}
            />
          </form>
          <br />
          <button
            type="button"
            onClick={onClose}
            className="border-solid border-2 rounded-md border-light-blue-500 p-1"
          >
            Close
          </button>
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
