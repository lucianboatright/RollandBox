import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import watchBox from '../../images/borders/Box_single.png';
// import { firebase } from '../../lib/firebase';

const MODAL_STYLES = {
  position: 'fixed',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '20px',
  marginTop: '6rem',
  marginBottom: '6rem'
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
  console.log('CONTNET INSIDE MODAL', watchInfo);
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES}>
        <button
          type="button"
          onClick={onClose}
          style={{ fontFamily: 'Acakadut' }}
          className="text-white bg-gradient-to-r from-red-600 to-blue-500 rounded px-2 py-0.5 hover:bg-white-600 hover:text-red"
        >
          X Close Modal
        </button>
        <div style={MODAL_STYLES} className="rounded">
          <div className="overflow-y-scroll h-screen">
            <div
              className=""
              style={{
                backgroundImage: `url(${watchBox})`,
                backgroundPosition: 'center top',
                backgroundSize: '22rem 60rem',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="pl-9 pr-8 pb-10 pt-10">
                <img alt="watch" src={watchInfo.imageurl} className="rounded w-60" />
              </div>
              <div>
                <div>
                  <span>{watchInfo.username}</span>
                </div>
                <div>
                  <span>{watchInfo.watchname}</span>
                </div>
                <div>
                  <span style={{ whiteSpace: 'pre-wrap' }}>{watchInfo.watchinfo}</span>
                </div>
                {/* <div>
                  <span>{watchInfo.comments}</span>
                </div> */}
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
