/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import WatchCard from '../watchCards/ProfileCard';
import singleBox from '../../images/borders/shortSingleBox.png';
import '../../styles/watches.css';

export default function Watches({ watches }) {
  const [isOpen, setIsOpen] = useState(false);

  const viewWatch = () => {
    console.log('HELLO');
    setIsOpen(true);
  };

  return (
    <div className="">
      <div className="h-16 border-t border-gray-primary">
        <div className="pt-3 flex flex-wrap overflow-hidden xl:-mx-4">
          {!watches ? (
            <>
              {[...new Array(12)].map((_, index) => (
                <Skeleton className="" key={index} count={1} width={120} height={170} />
              ))}
            </>
          ) : watches?.length > 0 ? (
            watches.map((watch) => (
              <div
                // key={watch.docId}
                className=""
                style={{
                  backgroundImage: `url(${singleBox})`,
                  backgroundPosition: 'center top',
                  backgroundSize: '9rem 14.2rem',
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
                    <img
                      className="border-grey rounded ml-2 mr-2 mt-1 mb-2 cursor-pointer"
                      src={watch.imageurl}
                      alt={`${watch.watchId}`}
                      width="170px"
                    />
                    <WatchCard open={isOpen} watchInfo={watch} onClose={() => setIsOpen(false)} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-2xl">No watches added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

Watches.propTypes = {
  watches: PropTypes.array.isRequired
};
