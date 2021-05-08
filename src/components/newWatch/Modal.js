import React from 'react';
import PropTypes from 'prop-types';

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

export default function Modal({ open, onClose, profile }) {
  if (!open) return null;

  return (
    <>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <p>hello {profile}</p>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.bool,
  profile: PropTypes.string
};
