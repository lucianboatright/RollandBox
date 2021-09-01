/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import WatchCard from './individualWatch';
import singleBox from '../../images/borders/shortSingleBox.png';
import '../../styles/watches.css';

export default function Watches({ watches, profile }) {
  console.log('PROFILE INFO INSIDE WATCHES', profile);
  return (
    <div className="mr-2 ml-2">
      <div className="h-16 border-t border-gray-primary">
        <div>
          <div className="pt-1 flex flex-wrap overflow-hidden flex justify-start">
            {!watches ? (
              <>
                <div className="">
                  {[...new Array(12)].map((_, index) => (
                    <Skeleton className="" key={index} count={1} width={120} height={170} />
                  ))}
                </div>
              </>
            ) : watches?.length > 0 ? (
              watches.map((watch) => <WatchCard key={watch.docId} watchInfo={watch} />)
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
  watches: PropTypes.array,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    imageurl: PropTypes.string
  })
};
