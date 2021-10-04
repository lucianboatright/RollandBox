import React from 'react';
import PropTypes from 'prop-types';
import watchBox from '../../images/borders/ProfileCardBoxEdit.png';
import paper from '../../images/borders/paper-1.jpg';
import watchBoxSide from '../../images/borders/2xSide.png';

const MODAL_STYLES = {
  position: 'fixed',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '20px',
  marginTop: '10rem',
  marginBottom: '6rem'
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
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES}>
        <div>
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
        </div>
        <div style={MODAL_STYLES} className="rounded">
          <div className="sm:hidden md:hidden lg:hidden xl:hidden">
            <div className="overflow-y-scroll h-screen">
              <div
                className="pl-1 pr-1 pt-3 rounded content-center"
                style={{
                  backgroundImage: `url(${watchBox})`,
                  backgroundPosition: 'center top',
                  backgroundSize: '24rem 146rem',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="pl-11 pr-9 pb-20 pt-11 sm:pb-10 md:pb-10 lg:pb-10 lx:pb-10">
                  <img alt="watch" src={watchInfo.imageurl} className="rounded w-64" />
                </div>
                <div
                  style={{
                    backgroundImage: `url(${paper})`,
                    backgroundPosition: '',
                    backgroundSize: '18rem 50rem',
                    backgroundRepeat: 'no-repeat',
                    fontFamily: 'Buggie',
                    color: 'rgb(0,15,85)'
                  }}
                  className="pt-3 ml-10 mr-8 mt-8 pb-60 rounded"
                >
                  <div className="content-center">
                    <div className="border-b-2 w-60 ml-1 text-4xl capitalize">
                      <span>{watchInfo.username}</span>
                    </div>
                    <div className="border-b-2 w-60 ml-1 text-xl">
                      <span>{watchInfo.watchname}</span>
                    </div>
                    <div className="border-b-2 w-60 ml-1">
                      <span style={{ whiteSpace: 'pre-wrap' }} className="overflow-y-auto">
                        {watchInfo.watchinfo}
                      </span>
                    </div>
                    <div className="mb-60">
                      {watchInfo.comments.map((item) => (
                        <p key={`${item.content}-${item.displayName}`} className="w-60 ml-1">
                          <span className="capitalize">
                            {item.displayName}: {item.comment}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:block md:block lg:block xl:block sm:w-max md:w-max lg:w-max xl:w-max">
            <div className="">
              <div
                className="pl-1 pr-1 pt-2 rounded"
                style={{
                  backgroundImage: `url(${watchBoxSide})`,
                  backgroundPosition: 'center top',
                  backgroundSize: '43rem 35.2rem',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="flex flex-row">
                  <div className=" ml-6 pr-2 pb-20 pt-11 sm:pb-10 md:pb-10 lg:pb-10 lx:pb-10">
                    <img alt="watch" src={watchInfo.imageurl} className="rounded w-72" />
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${paper})`,
                      backgroundPosition: '',
                      backgroundSize: '40rem 28.7rem',
                      backgroundRepeat: 'no-repeat',
                      fontFamily: 'Buggie',
                      color: 'rgb(0,15,85)'
                    }}
                    className="pt-3 ml-8 mr-8 mt-11 mb-2 rounded"
                  >
                    <div className="ml-3 mr-3">
                      <div className="border-b-2 w-64 ml-1 text-4xl capitalize">
                        <span>{watchInfo.username}</span>
                      </div>
                      <div className="border-b-2 w-64 ml-1 text-xl">
                        <span>{watchInfo.watchname}</span>
                      </div>
                      <div className="border-b-2 w-64 ml-1">
                        <span style={{ whiteSpace: 'pre-wrap' }} className="overflow-y-auto">
                          {watchInfo.watchinfo}
                        </span>
                      </div>
                      <div className="mb-64">
                        {watchInfo.comments.map((item) => (
                          <p key={`${item.content}-${item.displayName}`} className="w-64 ml-1">
                            <span className="capitalize">
                              {item.displayName}: {item.comment}
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
