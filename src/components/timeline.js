/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import useWatches from '../hooks/use-watches';
import Post from './post';
// import backGrid from '../images/borders/wood_watch_grid.png';
import grid from '../images/borders/wooden_grid_5x.png';

export default function Timeline() {
  const { watches } = useWatches();
  return (
    <div className="col-span-3">
      {/* <img src={grid} alt="grid" /> */}
      <div
        style={{
          backgroundImage: `url(${grid})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '44rem auto'
        }}
        className="mt-5 ml-8"
      >
        <div className="pt-10 flex pl-6 pl-12px flex-wrap overflow-hidden xl:-mx-0">
          {!watches ? (
            <>
              {[...new Array(12)].map((_, index) => (
                // <div
                //   key={index}
                //   className="pt-3"
                //   style={{
                //     backgroundImage: `url(${backGrid})`,
                //     backgroundPosition: 'top',
                //     backgroundSize: '165px',
                //     backgroundRepeat: 'repeat'
                //   }}
                // >
                <Skeleton
                  key={index}
                  className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                  count={1}
                  width={140}
                  height={180}
                />
                // </div>
              ))}
            </>
          ) : watches?.length > 0 ? (
            watches.map((content) => (
              <>
                {/* <div
                  key={content.docId}
                  className="pr-10"
                  style={{
                    backgroundImage: `url(${grid})`,
                    backgroundPosition: 'top'
                    // backgroundSize: '165px',
                    // backgroundRepeat: 'repeat'
                  }}
                > */}
                <Post
                  key={content.docId}
                  className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                  content={content}
                />
                {/* <img src={grid} alt="grid" /> */}
                {/* </div> */}
              </>
            ))
          ) : (
            <p key="" className="text-center text-2xl">
              You need to Follow others to see Watches
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
