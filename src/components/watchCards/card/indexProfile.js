import { useRef } from 'react';
import PropTypes from 'prop-types';
import Image from './imageProfile';
import Footer from './footerProfile';
import Comments from './commentsProfile';

export default function Post({ imageurl, watchName, comments, watchInfo, docId }) {
  console.log('WATCH INFO ON INDEX PROFILE', watchInfo);

  return (
    <div className="">
      {/* <div className="rounded col-span-1 border bg-white border-grey-primary"> */}
      <Image src={imageurl} caption={watchInfo} />
      <Footer caption={watchInfo} watchName={watchName} />
      <Comments comments={comments} />
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
