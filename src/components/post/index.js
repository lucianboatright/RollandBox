import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';

export default function Post({ content }) {
  const commentInput = useRef(null);

  const handleFocus = () => commentInput.current.focus();
  // console.log('content', content);

  return (
    <div className="rounded col-span-4 border bg-white border-grey-primary">
      <Header username={content.username} />
      <Image scr={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.username}
        totalLikes={content.likes.length}
        likedWatch={content.userLikedWatch}
        handleFocus={handleFocus}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedWatch: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired
  })
};
