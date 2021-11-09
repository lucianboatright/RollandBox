import PropTypes from 'prop-types';
import WatchCard from './individualWatch';
import '../../styles/watches.css';

export default function Watches({ watches }) {
  console.log(watches);
  return (
    <div className="mr-2 ml-2 ">
      <div className="border-t border-gray-primary ml-4">
        <div className="mx-auto max-w-screen-xl">
          <div className="pt-1 flex flex-wrap ml-16 ">
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
