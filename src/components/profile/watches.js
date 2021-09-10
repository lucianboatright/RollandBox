/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import WatchCard from './individualWatch';
import '../../styles/watches.css';

export default function Watches({ watches, profile }) {
  return (
    <div className="mr-2 ml-2 ">
      <div className="border-t border-gray-primary">
        <div className="">
          <div className="pt-1 ml-0 flex flex-wrap justify-center sm:justify-start sm:ml-5 md:justify-start md:ml-5 lg:justify-start lg:ml-5 xl:justify-start lx:ml-5 ">
            {!watches ? (
              <>
                <div className="">
                  {[...new Array(12)].map((_, index) => (
                    <Skeleton className="" key={index} count={1} width={120} height={170} />
                  ))}
                </div>
              </>
            ) : watches?.length > 0 ? (
              watches.map((watch) => <WatchCard key={profile.docId} watchInfo={watch} />)
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
