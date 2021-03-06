import { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import paper from '../../images/borders/paper-1.jpg';

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="">
      {/* <div className="rounded col-span-1 border bg-white border-grey-primary"> */}
      <Image className="" src={content.imageurl} caption={content.watchinfo} />
      <div
        className="rounded align-center ml-4"
        style={{
          backgroundImage: `url(${paper})`,
          backgroundPosition: '',
          backgroundSize: '30rem 30rem',
          backgroundRepeat: 'no-repeat',
          marginTop: '1.9rem'
        }}
      >
        <Header className="" username={content.username} avatar={content.user} />
        <Actions
          docId={content.username}
          totalLikes={(content.likes || []).length}
          likedWatch={content.userLikedWatch}
          handleFocus={handleFocus}
          watchContent={content}
        />
        <Footer
          caption={content.watchinfo}
          username={content.username}
          watchName={content.watchname}
        />
        <Comments
          docId={content.docId}
          comments={content.comments}
          posted={content.dateCreated}
          commentInput={commentInput}
        />
      </div>
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
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
