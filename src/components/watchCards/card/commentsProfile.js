import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Comments({ comments: allComments = [] }) {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="ml-1 p-0 pt-0 pb-0 pb-32 w-48">
        {comments.map((item) => (
          <p key={`${item.content}-${item.displayName}`} className="ml-0">
            <span className="capitalize" style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}>
              {item.displayName}: {item.comment}
            </span>
          </p>
        ))}
      </div>
    </>
  );
}
Comments.propTypes = {
  comments: PropTypes.array.isRequired
};
