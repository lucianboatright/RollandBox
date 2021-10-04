import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useContext } from 'react';
// import UserContext from '../../../context/user';
// import useUser from '../../../hooks/use-user';
import { firebase } from '../../../lib/firebase';
import Image from './imageProfile';
import Footer from './footerProfile';
import Comments from './commentsProfile';
import paper from '../../../images/borders/paper-1.jpg';
import deleteLogo from '../../../images/svg_png/deleteWhite.png';

const db = firebase.firestore();

export default function Post({
  imageurl,
  watchName,
  comments,
  watchInfo,
  onClose,
  docId,
  watchUserId,
  userId
}) {
  const [userProfile, setUserPrfile] = useState(false);
  // const { user: loggedInUser } = useContext(UserContext);
  // const { user } = useUser(loggedInUser?.uid);
  console.log('user', userId);
  console.log('Watch user', watchUserId);
  const handleDelete = () => {
    db.collection('watches')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('Deleted Post');
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
    onClose();
  };

  useEffect(() => {
    if (watchUserId === userId) {
      setUserPrfile(true);
    } else {
      console.log('UNTRUE');
      setUserPrfile(false);
    }
    console.log(userProfile);
  });

  return (
    <div className="">
      {/* <div className="rounded col-span-1 border bg-white border-grey-primary"> */}
      <div className="flex flex-col sm:hidden md:hidden lg:hidden xl:hidden">
        <div className="ml-1 mb-3">
          <Image src={imageurl} caption={watchInfo} className="h-10" />
        </div>
        <div
          className="rounded mt-16 ml-1"
          style={{
            backgroundImage: `url(${paper})`,
            backgroundPosition: '',
            backgroundSize: '23rem 60rem',
            backgroundRepeat: 'no-repeat',
            fontFamily: 'Buggie',
            color: 'rgb(0,15,85)'
          }}
        >
          {/* {userProfile === true ? (
            <button type="button" onClick={handleDelete}>
              <img
                alt="delete"
                src={deleteLogo}
                className="pb-2 mt-2 ml-2.5 h-10 w-8"
                // onClick={handleDelete}
              />
            </button> */}
          {userId === watchUserId ? (
            <button type="button" onClick={handleDelete}>
              <img
                alt="delete"
                src={deleteLogo}
                className="pb-2 mt-2 ml-2.5 h-10 w-8"
                // onClick={handleDelete}
              />
            </button>
          ) : (
            <span />
          )}
          <Footer caption={watchInfo} watchName={watchName} />
          <Comments comments={comments} />
        </div>
      </div>
      <div className=" pb-20 hidden sm:block md:block lg:block xl:block">
        <div className="flex flex-row">
          <div className="">
            <Image src={imageurl} caption={watchInfo} />
          </div>
          <div
            className="overflow-auto rounded pb-32 mt-9 ml-12 pl-4 mr-2 w-1/2 flex flex-col"
            style={{
              backgroundImage: `url(${paper})`,
              backgroundPosition: '',
              backgroundSize: '22rem 37rem',
              backgroundRepeat: 'no-repeat',
              fontFamily: 'Buggie',
              color: 'rgb(0,15,85)',
              height: '30rem'
            }}
          >
            <button type="button" onClick={handleDelete}>
              <img
                alt="delete"
                src={deleteLogo}
                className="pb-2 mt-2 ml-2.5 h-10 w-8"
                // onClick={handleDelete}
              />
            </button>
            <Footer caption={watchInfo} watchName={watchName} />
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  onClose: PropTypes.bool,
  imageurl: PropTypes.string,
  watchName: PropTypes.string,
  comments: PropTypes.string,
  watchInfo: PropTypes.string,
  docId: PropTypes.string,
  watchUserId: PropTypes.string,
  userId: PropTypes.string
};
