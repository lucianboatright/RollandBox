/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import backGrid from '../../images/borders/wooden_grid_3_long.png';
import '../../styles/watches.css';

export default function Watches({ watches }) {
  return (
    <div className="">
      <div
        className="alight-center"
        // height={200}
        // width={100}
        style={{
          backgroundImage: `url(${backGrid})`,
          height: '250vh',
          // width: '200vh',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="h-16 border-t border-gray-primary mt-12 pt-4">
          <div className="col-span-2 grid grid-cols-5 grid-rows-2">
            {!watches ? (
              <>
                {[...new Array(12)].map((_, index) => (
                  <Skeleton
                    className="space-x-10 space-y-20"
                    key={index}
                    count={1}
                    width={120}
                    height={170}
                  />
                ))}
              </>
            ) : watches?.length > 0 ? (
              watches.map((watch) => (
                <div key={watch.docId} className="relative group">
                  <img
                    src={`../../images/watches/${watch.watchId}.jpg`}
                    alt={`${watch.watchId}`}
                    width={120}
                    height={170}
                  />
                  <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded groupe-hover:flex hidden">
                    <p className="flex-items-center text-white font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-8 mr-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {watch.likes.length}
                    </p>
                    <p className="flex items-center text-white font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-8 mr-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {/* {watches.comments.length} */}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-2xl">No watches added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Watches.propTypes = {
  watches: PropTypes.array.isRequired
};
