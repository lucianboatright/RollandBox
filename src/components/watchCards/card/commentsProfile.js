import PropTypes from 'prop-types';

export default function Comments({ comments: allComments = [] }) {
  const comments = allComments;
  return (
    <>
      <div className="ml-1 p-0 pt-0 pb-0 pb-32 w-64 flex flex-col">
        {comments.map((item) => (
          <p
            key={`${item.content}-${item.displayName}`}
            className="ml-4 text-xl flex justify-start"
          >
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
