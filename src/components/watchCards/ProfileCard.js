// import React from 'react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import UserContext from '../../context/user';
import useUser from '../../hooks/use-user';
import watchBox from '../../images/borders/ProfileCardBoxEdit.png';
import watchBoxLong from '../../images/borders/2xSide.png';
import PostCard from './card/indexProfile';
// import { firebase } from '../../lib/firebase';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '20px',
  marginTop: '2rem',
  marginBottom: '4rem',
  height: '650px'
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

export default function Modal({ open, onClose, image, name, comments, info, id, watchUserId }) {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  // console.log('user', user.userId);
  // console.log('Watch user', watchUserId);
  if (!open) return null;
  return (
    <>
      <div style={OVERLAY_STYLES}>
        <div>
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
            <div className=" sm:hidden md:hidden lg:hidden xl:hidden">
              <div className="overflow-y-scroll h-screen">
                <div
                  className="pt-6 pl-11 pr-10 rounded "
                  style={{
                    backgroundImage: `url(${watchBox})`,
                    backgroundPosition: 'center top',
                    backgroundSize: '25rem 151rem',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className=" ">
                    <PostCard
                      userId={user.userId}
                      watchUserId={watchUserId}
                      imageurl={image}
                      watchName={name}
                      comments={comments}
                      watchInfo={info}
                      docId={id}
                      className="w-60 overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block md:block lg:block xl:block sm:w-max md:w-max lg:w-max xl:w-max">
              <div className="">
                <div
                  className="pt-4 rounded pl-10 pr-10 "
                  style={{
                    backgroundImage: `url(${watchBoxLong})`,
                    backgroundPosition: 'center top',
                    backgroundSize: '45rem 36.5rem',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <div className="">
                    <PostCard
                      onClose={() => onClose()}
                      userId={user.userId}
                      watchUserId={watchUserId}
                      imageurl={image}
                      watchName={name}
                      comments={comments}
                      watchInfo={info}
                      docId={id}
                      className="w-10 overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-3/6"
                    />
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
  onClose: PropTypes.bool,
  image: PropTypes.string,
  name: PropTypes.string,
  comments: PropTypes.array,
  info: PropTypes.string,
  id: PropTypes.string,
  watchUserId: PropTypes.string
};
