import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-comment';

export default function Comments({ docId, comments: allComments = [], posted, commentInput }) {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="ml-1 p-0 pb-1.5">
        {comments.length >= 1 && (
          <div
            className="text-xs text-gray-700 mb-0 cursor-pointer"
            style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}
          >
            {comments.length} Comments
          </div>
        )}
        {comments.length === 0 && (
          <div
            className="text-xs text-gray-700 cursor-pointer mb-11"
            style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}
          >
            <div className="pb-1.5">Add Comments</div>
          </div>
        )}
        {comments.length === 1 && (
          <div
            style={{ paddingTop: '0.1rem' }}
            className="text-xs text-gray-700 cursor-pointer mb-6 pb-2"
          />
        )}
        {comments.length === 2 && <div className="text-xs text-gray-700 cursor-pointer mb-4" />}
        {comments.slice(0, 3).map((item) => (
          <p
            key={`${item.comment}-${item.displayName}`}
            className="mb-0 text-xs cursor-pointer w-20 truncate"
          >
            <Link to={`/${item.displayName}`} className="inline">
              <span
                className="text-xs mr-1 font-bold capitalize"
                style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}
              >
                {item.displayName}:
              </span>
            </Link>
            <div
              className="has-tooltip inline"
              style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}
            >
              <span
                className="text-xl tooltip rounded shadow-lg p-1 bg-gray-100"
                style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}
              >
                {item.comment}
              </span>
              {item.comment}
            </div>
          </p>
        ))}
        {!!posted && (
          <p className="text-xs text-gray-700 uppercase mt-0">
            {formatDistance(posted, new Date())} ago
          </p>
        )}
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}
Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number,
  commentInput: PropTypes.object.isRequired
};
