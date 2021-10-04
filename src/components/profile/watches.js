import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import WatchCard from './individualWatch';
import '../../styles/watches.css';

export default function Watches({ watches }) {
  console.log('WATCGHES', watches);
  return (
    <div className="mr-2 ml-2 ">
      <div className="border-t border-gray-primary">
        <div className="">
          <div className="pt-1 flex flex-wrap justify-center ml-1 sm:justify-start sm:ml-5 md:justify-start md:ml-5 lg:justify-start lg:ml-5 xl:justify-start lx:ml-5 ">
            {watches?.length > 0 ? (
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
  watches: PropTypes.array
};
