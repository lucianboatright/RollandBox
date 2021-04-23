/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import useWatches from '../hooks/use-watches';
import Post from './post';
// import woodBorder from '../images/borders/plank_2_vertical.png';
import backGrid from '../images/borders/wooden_grid_3.png';

export default function Timeline() {
  const { watches } = useWatches();
  return (
    <div className="col-span-3 grid grid-cols-5 grid-rows-3 gap-4">
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
        watches.map((content) => (
          <>
            <Post
              className="text-pink-800 space-x-10 space-y-20"
              key={content.docId}
              content={content}
              width={120}
              height={170}
            />
            {/* <img src={woodBorder} alt="" /> */}
          </>
        ))
      ) : (
        <p className="text-center text-2xl">You need to Follow others to see Watches</p>
      )}
    </div>
  );
}
