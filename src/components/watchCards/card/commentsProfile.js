import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './add-commentProfile';

export default function Comments({ docId, comments: allComments = [], posted, commentInput }) {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="ml-1 p-0 pt-0 pb-0 pb-32">
        {comments.length >= 1 && (
          <div
            className="text-xl text-gray-700 mb-1 mt-1 cursor-pointer border-b-2 "
            style={{ fontFamily: 'Buggie' }}
          >
            {comments.length} comments
          </div>
        )}
        {comments.length === 0 && (
          <div
            className="text-xl text-gray-700 cursor-pointer mb-12"
            style={{ fontFamily: 'Buggie' }}
          >
            Add Comments
          </div>
        )}
        {comments.length === 1 && <div className="text-xs text-gray-700 cursor-pointer mb-8" />}
        {comments.length === 2 && <div className="text-xs text-gray-700 cursor-pointer mb-4" />}
        {comments.slice(0).map((item) => (
          <span
            key={`${item.comment}-${item.displayName}`}
            className="text-xl cursor-pointer content-start w-48 text-left"
          >
            <Link to={`/${item.displayName}`} className="inline">
              <span
                className="text-xl mr-1 font-bold capitalize inline text-grey"
                style={{ fontFamily: 'Buggie' }}
              >
                {item.displayName}:
              </span>
            </Link>
            <div className="inline text-xl" style={{ fontFamily: 'Buggie' }}>
              {item.comment}
            </div>
          </span>
        ))}
        {!!posted && (
          <span className="text-xl text-gray-700 uppercase mt-0">
            {formatDistance(posted, new Date())} ago
          </span>
        )}
      </div>
    </>
  );
}
Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number,
  commentInput: PropTypes.object.isRequired
};
