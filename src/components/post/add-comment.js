import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);
    setComment('');

    return firebase
      .firestore()
      .collection('watches')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  return (
    <div className="border boarder-gray-primary">
      <form
        className="pl-0 pr-1"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <div className="flex">
          <div className="w-4/5">
            <input
              aria-label="Add a Comment"
              autoComplete="off"
              className="text-sm text-gray-600 w-f mr-0 py-1 px-1"
              type="text"
              name="add-comment"
              placeholder="Comment ..."
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              ref={commentInput}
            />
          </div>
          <div className="w-1/5 ">
            <button
              className={`inline-block align-baseline text-sm font-bold text-pink-800 pr-10 ${
                !comment && 'opacity-50'
              }`}
              type="button"
              disabled={comment.length < 1}
              onClick={handleSubmitComment}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object
};
