import PropTypes from 'prop-types';
import WatchCard from './individualWatch';
import '../../styles/watches.css';

export default function Watches({ watches }) {
  console.log(watches);
  return (
    <div className="mr-2 ml-2 ">
      <div className="border-t border-gray-primary">
        <div className="">
          <div className="pt-1 flex flex-wrap justify-center ml-1 sm:justify-start sm:ml-5 md:justify-start md:ml-5 lg:justify-start lg:ml-5 xl:justify-start lx:ml-5 ">
            {watches?.length > 0 ? (
              watches.map((watch) => <WatchCard key={watch.docId} watchInfo={watch} />)
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
