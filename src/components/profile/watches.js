/* eslint-disable no-nested-ternary */
import { parseWithOptions } from 'date-fns/fp';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import '../../styles/watches.css';

export default function Watches({ watches }) {
  return (
    <div className="">
      <div className="h-16 border-t border-gray-primary mt-12 pt-4">
        <div className="col-span-2 grid grid-rows-3 grid-flow-col gap-5">
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
            watches.map((watch) => <div key={watch} />)
          ) : (
            <p className="text-center text-2xl">You need to Follow others to see Watches</p>
          )}
        </div>
        {/* <div className="grid grid-rows-3 grid-flow-col gap-5">
          {!watches ? (
            <>
              <Skeleton count={3} width={120} height={170} />
            </>
          ) : watches.length > 0 ? (
            watches.map((watch) => (
              <div className="space-x-10 space-y-20" key={watch.docId}>
                Hello
              </div>
            ))
          ) : null}
        </div> */}
      </div>
    </div>
  );
}

Watches.propTypes = {
  watches: PropTypes.array.isRequired
};
