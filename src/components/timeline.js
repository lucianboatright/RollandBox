import Skeleton from 'react-loading-skeleton';
import useWatches from '../hooks/use-watches';
import Post from './post';
import singleBox from '../images/borders/Box_single.png';

export default function Timeline() {
  const { watches } = useWatches();
  return (
    <div className="col-span-5">
      <div className="pt-5 flex pl-2 pl-14px flex-wrap overflow-hidden sm:pl-0 md:pl-0 lg:pl-0 xl:pl-0">
        {!watches ? (
          <>
            {[...new Array(12)].map((_, index) => (
              <div
                key={index}
                className="pt-3"
                style={{
                  backgroundImage: `url(${singleBox})`,
                  backgroundPosition: '-27px top',
                  backgroundSize: '16.5rem 43rem',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <Skeleton
                  key={index}
                  className=" ml-5 w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                  count={1}
                  width={195}
                  height={311}
                />
                <Skeleton
                  key={index}
                  className=" ml-5 w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                  count={1}
                  width={195}
                  height={311}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {watches?.length > 0 ? (
              watches.map((content) => (
                <>
                  <div
                    key={content.dateAdded}
                    className=""
                    style={{
                      backgroundImage: `url(${singleBox})`,
                      backgroundPosition: '-27px top',
                      backgroundSize: '16.5rem 43rem',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    <div className="mr-3 ">
                      <Post
                        key={(content.dateAdded, console.log(content.dateAdded))}
                        className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                        content={content}
                      />
                    </div>
                  </div>
                </>
              ))
            ) : (
              <span
                style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
                key=""
                className="text-center text-2xl"
              >
                <br />
                <br />
                <p>You need to Follow others to see Watches</p>
                <br />
                <p>Either go to someone Profile and click 'Follow'</p>
                <br />
                <p>Or Click 'Follow' on one of our users on the right.</p>
                <br />
                <br />
                <br />
                <br />
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
