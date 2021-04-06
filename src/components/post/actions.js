import { PropTypes } from 'prop-types';
import { useState, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function Actions({ docId, totalLikes, likedWatch, handleFocus }) {
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);
  const [toggleLiked, setToggleLiked] = useState(likedWatch);
  const [likes, setLikes] = useState(totalLikes);
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handdleToggledLikes = async () => {
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
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
            className={`w-8 mr-4 select-none cursor-pointer ${
              toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedWatch: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired
};
