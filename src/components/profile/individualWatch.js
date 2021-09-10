import PropTypes from 'prop-types';
import { useState } from 'react';
import WatchCard from '../watchCards/ProfileCard';
import singleBox from '../../images/borders/shortSingleBox.png';
import '../../styles/watches.css';

export default function IndividualWatch({ watchInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log('IsIt OPEN', isOpen);

  // const closeModal = () => {
  //   console.log('CLOSING IN INDIVIDI CARD', isOpen);
  //   setIsOpen(false);
  // };

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
        backgroundSize: '15rem 19.5rem',
        backgroundRepeat: 'no-repeat'
      }}
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
                src={watchInfo.imageurl}
                alt={`${watchInfo.watchId}`}
                width="160px"
              />
            </div>
          </button>
          <WatchCard
            open={isOpen}
            image={watchInfo.imageurl}
            name={watchInfo.watchname}
            comments={watchInfo.comments}
            info={watchInfo.watchinfo}
            id={watchInfo.docId}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

IndividualWatch.propTypes = {
  watchInfo: PropTypes.object
};
