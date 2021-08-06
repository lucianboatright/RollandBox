/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import backGrid from '../../images/borders/wood_watch_grid.png';
import '../../styles/watches.css';

export default function Watches({ watches }) {
  console.log('WATCHES', watches);
  return (
    <div className="">
      <div className="h-16 border-t border-gray-primary">
        {/* <div
          className="alight-center mt-4"
          style={{
            backgroundImage: `url(${backGrid})`,
            backgroundPosition: 'center',
            backgroundSize: '150px',
            backgroundRepeat: 'repeat'
            // paddingVertical: '10'
            // backgroundPosition: 'top',
            // position: 'absolute',
            // bottom: '0'
            // width: '150px',
            // height: '100px'
          }}
        > */}
        {/* <img src={backGrid} alt="" /> */}
        <div className="pt-1 flex flex-wrap overflow-hidden xl:-mx-4">
          {!watches ? (
            <>
              {[...new Array(12)].map((_, index) => (
                <Skeleton className="" key={index} count={1} width={120} height={170} />
              ))}
            </>
          ) : watches?.length > 0 ? (
            watches.map((watch) => (
              <div
                key={watch.docId}
                className="pt-1"
                style={{
                  backgroundImage: `url(${backGrid})`,
                  backgroundPosition: 'top',
                  backgroundSize: '162px',
                  backgroundRepeat: 'repeat'
                }}
              >
                <div className="rounded-full">
                  <img
                    className="p-2"
                    src={watch.imageurl}
                    alt={`${watch.watchId}`}
                    width="150px"
                    // height="100px"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-2xl">No watches added yet</p>
          )}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

Watches.propTypes = {
  watches: PropTypes.array.isRequired
};
