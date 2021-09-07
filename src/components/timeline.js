/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import useWatches from '../hooks/use-watches';
import Post from './post';
import singleBox from '../images/borders/Box_single_LowerMiddle.png';
// import grid from '../images/borders/wooden_grid_5x.png';

export default function Timeline() {
  const { watches } = useWatches();
  console.log('WATCHES', singleBox);
  return (
    <div className="col-span-5">
      <div className="pt-5 flex pl-0 pl-14px flex-wrap overflow-hidden">
        {!watches ? (
          <>
            {[...new Array(12)].map((_, index) => (
              <div
                key={index}
                className="pt-3"
                style={{
                  backgroundImage: `url(${singleBox})`,
                  backgroundPosition: 'top',
                  backgroundSize: '165px',
                  backgroundRepeat: 'repeat'
                }}
              >
                <Skeleton
                  key={index}
                  className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                  count={1}
                  width={140}
                  height={180}
                />
              </div>
            ))}
          </>
        ) : watches?.length > 0 ? (
          watches.map((content) => (
            <>
              <div
                key={content.docId}
                className=""
                style={{
                  backgroundImage: `url(${singleBox})`,
                  backgroundPosition: 'center top',
                  backgroundSize: '14.5rem 32rem',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="mr-3 ">
                  <Post
                    key={content.docId}
                    className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                    content={content}
                  />
                </div>
              </div>
            </>
          ))
        ) : (
          <p key="" className="text-center text-2xl">
            You need to Follow others to see Watches
          </p>
        )}
      </div>
    </div>
    // </div>
  );
}
