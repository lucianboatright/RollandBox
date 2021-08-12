/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import useWatches from '../hooks/use-watches';
import Post from './post';
import backGrid from '../images/borders/wood_watch_grid.png';
import useUser from '../hooks/use-user';

export default function Timeline() {
  const { watches } = useWatches();
  const {
    user: { imageurl }
  } = useUser();

  return (
    <div className="col-span-3">
      <div>
        <div className="pt-1 flex pl-7 flex-wrap overflow-hidden xl:-mx-0">
          {!watches ? (
            <>
              {[...new Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="pt-3"
                  style={{
                    backgroundImage: `url(${backGrid})`,
                    backgroundPosition: 'top',
                    backgroundSize: '165px',
                    backgroundRepeat: 'repeat'
                  }}
                >
                  <Skeleton
                    key={index}
                    className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                    count={1}
                    width={120}
                    height={170}
                  />
                </div>
              ))}
            </>
          ) : watches?.length > 0 ? (
            watches.map((content) => (
              <>
                <div
                  key={content.docId}
                  className="pt-3"
                  style={{
                    backgroundImage: `url(${backGrid})`,
                    backgroundPosition: 'top',
                    backgroundSize: '165px',
                    backgroundRepeat: 'repeat'
                  }}
                >
                  <Post
                    key={content.docId}
                    className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                    content={content}
                    avatar={imageurl}
                  />
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
    </div>
  );
}
