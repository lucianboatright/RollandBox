import PropTypes from 'prop-types';
import { useState } from 'react';
import WatchCard from '../watchCards/ProfileCard';
import singleBox from '../../images/borders/shortSingleBox.png';
import '../../styles/watches.css';

export default function IndividualWatch({ watchInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log('IsIt OPEN', isOpen);

  const closeModal = () => {
    console.log('CLOSING IN INDIVIDI CARD', isOpen);
    setIsOpen(false);
  };

  const viewWatch = () => {
    console.log('IS THIS OPENINGN IT', isOpen);
    setIsOpen(true);
    console.log('IS THIS OPENINGN IT 22', isOpen);
  };

  console.log('IsIt OPEN LATER', isOpen);

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
      <div className="pt-3 mb-4">
        <div>
          <button
            type="button"
            className=""
            onClick={viewWatch}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                viewWatch();
              }
            }}
          >
            <div>
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
    </div>
  );
}

IndividualWatch.propTypes = {
  watchInfo: PropTypes.object
};
