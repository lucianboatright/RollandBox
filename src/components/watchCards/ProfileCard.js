import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import watchBox from '../../images/borders/Box_single.png';
import PostCard from './card';
// import { firebase } from '../../lib/firebase';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '40px',
  marginTop: '4rem',
  marginBottom: '4rem'
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

export default function Modal({ open, onClose, watchInfo }) {
  const closeCard = (e) => {
    // e.preventDefault();
    console.log('CLOSING');
    onClose();
  };

  console.log('CONTNET INSIDE MODAL', watchInfo);

  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES}>
        <button
          type="button"
          onClick={closeCard}
          style={{ fontFamily: 'Acakadut' }}
          className="text-white bg-gradient-to-r from-red-600 to-blue-500 rounded px-2 py-0.5 hover:bg-white-600 hover:text-red"
        >
          X Close Modal
        </button>
        <div style={MODAL_STYLES} className="rounded">
          <div className="overflow-y-scroll h-screen">
            <div
              className="pt-3"
              style={{
                backgroundImage: `url(${watchBox})`,
                backgroundPosition: 'center top',
                backgroundSize: '18rem 44rem',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="pl-10 pr-10">
                <PostCard
                  content={watchInfo}
                  className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.bool,
  watchInfo: PropTypes.array
};
