import { useRef } from 'react';
import PropTypes, { array } from 'prop-types';
import Header from './headerProfile';
import Image from './imageProfile';
import Actions from './actionsProfile';
import Footer from './footerProfile';
import Comments from './commentsProfile';

export default function Post({ imageurl, watchName, comments, watchInfo, docId }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="">
      {/* <div className="rounded col-span-1 border bg-white border-grey-primary"> */}
      <Image src={imageurl} caption={watchInfo} />
      <Footer caption={watchInfo} watchName={watchName} />
      <Comments docId={docId} comments={comments} commentInput={commentInput} />
    </div>
  );
}

Post.propTypes = {
  imageurl: PropTypes.string,
  watchName: PropTypes.string,
  comments: PropTypes.string,
  watchInfo: PropTypes.string,
  docId: PropTypes.string
};
