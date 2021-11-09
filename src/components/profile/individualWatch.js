import PropTypes from 'prop-types';
import { useState } from 'react';
import WatchCard from '../watchCards/ProfileCard';
import singleBox from '../../images/borders/shortSingleBox.png';
import '../../styles/watches.css';

export default function IndividualWatch({ watchInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const viewWatch = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="hidden sm:block md:block lg:block xl:block">
        <div
          className=""
          style={{
            backgroundImage: `url(${singleBox})`,
            backgroundPosition: '-26px top',
            backgroundSize: '16.5rem 21.5rem',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="pt-2 pb-2">
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
                    className="rounded ml-4 mr-4 mt-2  cursor-pointer"
                    src={watchInfo.imageurl}
                    alt={`${watchInfo.watchId}`}
                    width="190px"
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
                watchUserId={watchInfo.userId}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
        <div
          className=""
          style={{
            backgroundImage: `url(${singleBox})`,
            backgroundPosition: '-26px top',
            backgroundSize: '23.5rem 31.5rem',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="pt-2 pb-2">
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
                    className="rounded ml-4 mr-4 mt-2  cursor-pointer"
                    src={watchInfo.imageurl}
                    alt={`${watchInfo.watchId}`}
                    width="310px"
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
                watchUserId={watchInfo.userId}
                onClose={() => setIsOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

IndividualWatch.propTypes = {
  watchInfo: PropTypes.object
};
