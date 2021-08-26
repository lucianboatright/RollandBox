/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import singleBox from '../../images/borders/shortSingleBox.png';
import '../../styles/watches.css';

export default function Watches({ watches }) {
  console.log('WATCHES BOX', singleBox);
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
                  backgroundSize: '8rem 12rem',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="">
                  <img
                    className="border-grey rounded ml-2 mr-2 mt-2 mb-2"
                    src={watch.imageurl}
                    alt={`${watch.watchId}`}
                    width="150px"
                  />
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
