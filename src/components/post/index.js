import { useRef } from 'react';
import PropTypes, { array } from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  console.log('Conetnet hunt for caption', content.watchinfo);

  return (
    <div className="">
      {/* <div className="rounded col-span-1 border bg-white border-grey-primary"> */}
      <Image className="" src={content.imageurl} caption={content.watchinfo} />
      <Header className="" username={content.username} avatar={content.user} />
      <Actions
        docId={content.username}
        totalLikes={(content.likes || []).length}
        likedWatch={content.userLikedWatch}
        handleFocus={handleFocus}
      />
      <Footer caption={content.watchinfo} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageurl: PropTypes.string.isRequired,
    watchinfo: PropTypes.string,
    docId: PropTypes.string.isRequired,
    userLikedWatch: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number,
    user: PropTypes.array
  })
};
