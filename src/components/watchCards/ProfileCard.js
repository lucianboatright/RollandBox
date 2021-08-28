import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import watchBox from '../../images/borders/ProfileCardBox.png';
import PostCard from './card/indexProfile';
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

export default function Modal({ open, onClose, image, name, comments, info, id }) {
  // const closeCard = (e) => {
  //   // e.preventDefault();
  //   console.log('CLOSING');
  //   onClose();
  // };

  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES}>
        <button
          type="button"
          onClick={onClose}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onClose();
            }
          }}
          style={{ fontFamily: 'Acakadut' }}
          className="text-white bg-gradient-to-r from-red-600 to-blue-500 rounded px-2 py-0.5 hover:bg-white-600 hover:text-red"
        >
          X Close Modal
        </button>
        <div style={MODAL_STYLES} className="rounded">
          <div className="overflow-y-scroll h-screen">
            <div
              className="pt-3 rounded"
              style={{
                backgroundImage: `url(${watchBox})`,
                backgroundPosition: 'center top',
                backgroundSize: '18rem 103rem',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="pl-10 pr-10">
                <PostCard
                  imageurl={image}
                  watchName={name}
                  comments={comments}
                  watchInfo={info}
                  docId={id}
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
  image: PropTypes.string,
  name: PropTypes.string,
  comments: PropTypes.array,
  info: PropTypes.string,
  id: PropTypes.string
};
