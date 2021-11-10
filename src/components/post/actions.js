import { PropTypes } from 'prop-types';
import { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
// import { firebase } from '../../lib/firebase';
import UserContext from '../../context/user';
import WatchCard from '../watchCards/TimeLineCard';
import watchLogo from '../../images/svg_png/addWatchLogoPNG.png';
import watchLogoPink from '../../images/svg_png/addWatchLogoPNGPINK.png';
import { ReactComponent as WatchLogo } from '../../images/svg_png/watch.svg';
import { ReactComponent as Magnifying } from '../../images/svg_png/magnifying.svg';

// const db = firebase.firestore();

export default function Actions({ docId, totalLikes, likedWatch, watchContent, handleFocus }) {
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);
  const [toggleLiked, setToggleLiked] = useState(likedWatch);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [isOpen, setIsOpen] = useState(false);

  const viewWatch = () => {
    setIsOpen(true);
  };

  const handleToggleLiked = async () => {
    console.log('docId', docId);
    console.log('watchcontent', watchContent);
    setToggleLiked((toggleLiked) => !toggleLiked);
    await firebase
      .firestore()
      .collection('watches')
      .doc(watchContent.docId)
      .update({
        likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };
  // const handleToggleLiked = async () => {
  //   console.log('docId', docId);
  //   setToggleLiked((toggleLiked) => !toggleLiked);
  //   await firebase
  //     .firestore()
  //     .collection('watches')
  //     .doc(docId)
  //     .update({
  //       likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
  //     });

  //   setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  // };

  return (
    <>
      <div className="flex justify-between pt-0.3 mt-1">
        <div className="flex items-center">
          <div>
            <Magnifying
              onClick={viewWatch}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  viewWatch();
                }
              }}
              className="h-5 mr-2 ml-2 select-none cursor-pointer"
            />
            <WatchCard open={isOpen} watchInfo={watchContent} onClose={() => setIsOpen(false)} />
          </div>
          <div className="pt-0">
            <button
              type="button"
              onClick={handleToggleLiked}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleLiked();
                }
              }}
              className="w-6 h-6 ml-0.5 mr-1 select-none cursor-pointer flex items-center"
            >
              {toggleLiked ? (
                <img alt="watch" src={watchLogoPink} />
              ) : (
                <img alt="watch" src={watchLogo} />
              )}
            </button>
          </div>
          <div className="pl-1">
            <p
              className="font-bold text-lg"
              style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}
            >
              {likes === 1 ? `${likes} like` : `${likes} likes`}
            </p>
          </div>
          {/* <div>
            <WatchLogo
              onClick={handleToggleLiked}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleLiked();
                }
              }}
              className={`w-4 mr-2 select-none cursor-pointer ${
                toggleLiked ? 'fill-current text-red-600' : 'text-black-light'
              }`}
            />
            {likes === 1 ? `${likes} like` : `${likes} likes`}
          </div> */}
        </div>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedWatch: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
  watchContent: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageurl: PropTypes.string.isRequired,
    watchinfo: PropTypes.string,
    watchname: PropTypes.string,
    docId: PropTypes.string.isRequired,
    userLikedWatch: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number,
    user: PropTypes.array
  })
};
