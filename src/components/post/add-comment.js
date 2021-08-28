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
    <div className="border-2 border-grey-800 rounded ">
      <form
        className="pl-0 pr-0"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      >
        <div className="">
          <div className="">
            <input
              aria-label="Add a Comment"
              autoComplete="off"
              className="text-xs text-gray-600 mr-0"
              type="text"
              name="add-comment"
              placeholder="Comment ..."
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              ref={commentInput}
              style={{ width: '4rem' }}
            />
            <button
              className={`inline-block align-baseline text-xs font-bold text-white bg-gradient-to-r from-pink-400 to-blue-500 ml-1 pl-2 pt-1.5 pb-1 pr-3 rounded border-grey-800 ${
                !comment && 'opacity-50'
              }`}
              type="button"
              disabled={comment.length < 1}
              onClick={handleSubmitComment}
            >
              <span className="pl-1">Add</span>
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
