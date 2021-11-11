import PropTypes from 'prop-types';
import WatchCard from './individualWatch';
import '../../styles/watches.css';

export default function Watches({ watches }) {
  return (
    <div className="mr-2 ml-2 ">
      <div className="border-t border-gray-primary ml-1.5 sm:ml-4 md:ml-4 xl:ml-4 lg:ml-4">
        <div className="mx-auto max-w-screen-xl">
          <div className="pt-1 flex flex-wrap justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start  ml-1 sm:ml-16 md:ml-16 lg:ml-16 xl:ml-16 ">
            {watches?.length > 0 ? (
              watches.map((watch) => <WatchCard key={watch.dateAdded} watchInfo={watch} />)
            ) : (
              <div style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}>
                <br />
                <br />
                <span className="text-center text-2xl">No watches added yet</span>
                <p className="text-center text-2xl">Use the Button on the header to add watches.</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
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
