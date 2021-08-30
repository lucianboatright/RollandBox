import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import watchBox from '../../images/borders/ProfileCardBox.png';
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
              className="pl-1 pr-1 rounded pb-40 content-center"
              style={{
                backgroundImage: `url(${watchBox})`,
                backgroundPosition: 'center top',
                backgroundSize: '24rem 140rem',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="pl-11 pr-9 pb-10 pt-11">
                <img alt="watch" src={watchInfo.imageurl} className="rounded w-64" />
              </div>
              <div style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }} className="pt-10">
                <div className="border-b-2 w-64 ml-11 text-4xl capitalize">
                  <span>{watchInfo.username}</span>
                </div>
                <div className="border-b-2 w-64 ml-11 text-xl">
                  <span>{watchInfo.watchname}</span>
                </div>
                <div className="border-b-2 w-64 ml-11">
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
  onClose: PropTypes.func,
  watchInfo: PropTypes.array
};
