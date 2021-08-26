import { PropTypes } from 'prop-types';
import { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import WatchCard from '../watchCards/TimeLineCard';
import { ReactComponent as WatchLogo } from '../../images/svg_png/watch.svg';
import { ReactComponent as Magnifying } from '../../images/svg_png/magnifying.svg';

export default function Actions({ docId, totalLikes, likedWatch, watchContent, handleFocus }) {
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);
  const [toggleLiked, setToggleLiked] = useState(likedWatch);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [isOpen, setIsOpen] = useState(false);

  console.log('WATCH CONTENT IN ACTIONS', watchContent);

  const viewWatch = () => {
    console.log('HELLO');
    setIsOpen(true);
  };

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);
    await firebase
      .firestore()
      .collection('watches')
      .doc(docId)
      .update({
        likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="flex justify-between p-1 mt-0">
        <div className="flex">
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
          <svg
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleFocus();
              }
            }}
            className="w-4 text-black-light select-none cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <div>
            <Magnifying
              onClick={viewWatch}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  viewWatch();
                }
              }}
              className={`w-4 mr-2 ml-2 select-none cursor-pointer ${
                toggleLiked ? 'fill-current text-red-600' : 'text-black-light'
              }`}
            />
            <WatchCard open={isOpen} watchInfo={watchContent} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
      <div className="pl-2 py-0">
        <p className="font-light text-xs font-sx">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
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
