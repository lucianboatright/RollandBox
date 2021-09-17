import PropTypes from 'prop-types';
import { useState } from 'react';
// import PostCard from '../watchCards/ProfileCard';
import singleBox from '../../images/borders/shortSingleBox.png';
import '../../styles/watches.css';

export default function IndividualWatch({ postInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const viewWatch = () => {
    setIsOpen(true);
  };

  return (
    <div
      className=""
      // style={{
      //   backgroundImage: `url(${singleBox})`,
      //   backgroundPosition: 'center top',
      //   backgroundSize: '15rem 19.5rem',
      //   backgroundRepeat: 'no-repeat'
      // }}
    >
      <div className="pt-2 mb-3">
        <div>
          <button
            type="button"
            onClick={viewWatch}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                viewWatch();
              }
            }}
          >
            <div>
              <img
                className="rounded ml-4 mr-4 mt-5 pl-0.5 cursor-pointer"
                src={postInfo.imageurl}
                alt={`${postInfo.watchId}`}
                width="160px"
              />
            </div>
          </button>
          {/* <PostCard
            open={isOpen}
            image={postInfo.imageurl}
            name={postInfo.watchname}
            comments={postInfo.comments}
            info={postInfo.postinfo}
            id={postInfo.docId}
            onClose={() => setIsOpen(false)}
          /> */}
        </div>
      </div>
    </div>
  );
}

IndividualWatch.propTypes = {
  postInfo: PropTypes.object
};
