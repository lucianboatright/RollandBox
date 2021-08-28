import PropTypes from 'prop-types';
import { useState } from 'react';
import WatchCard from '../watchCards/ProfileCard';
import singleBox from '../../images/borders/shortSingleBox.png';
import '../../styles/watches.css';

export default function IndividualWatch({ watchInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const viewWatch = () => {
    setIsOpen(true);
  };

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${singleBox})`,
        backgroundPosition: 'center top',
        backgroundSize: '11.5rem 15.2rem',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="mt-2">
        <button
          type="button"
          onClick={viewWatch}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              viewWatch();
            }
          }}
        >
          <div className="pb-2 pt-1">
            <img
              className="rounded ml-3 mr-2.5 mt-2.5 cursor-pointer"
              src={watchInfo.imageurl}
              alt={`${watchInfo.watchId}`}
              width="170px"
            />
            <WatchCard
              open={isOpen}
              image={watchInfo.imageurl}
              name={watchInfo.watchname}
              comments={watchInfo.comments}
              info={watchInfo.watchinfo}
              id={watchInfo.docId}
              onClose={closeModal}
            />
          </div>
        </button>
      </div>
    </div>
  );
}

IndividualWatch.propTypes = {
  watchInfo: PropTypes.array
};
