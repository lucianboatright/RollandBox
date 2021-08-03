/* eslint-disable no-nested-ternary */
import Skeleton from 'react-loading-skeleton';
import useWatches from '../hooks/use-watches';
import Post from './post';
// import woodBorder from '../images/borders/plank_2_vertical.png';
import backGrid from '../images/borders/wood_watch_grid.png';

export default function Timeline() {
  const { watches } = useWatches();
  return (
    <div className="col-span-3">
      <div
      // className="alight-center mt-4"
      // style={{
      //   backgroundImage: `url(${backGrid})`,
      //   // backgroundPosition: 'center',
      //   backgroundSize: 'auto',
      //   backgroundRepeat: 'no-repeat',
      //   paddingVertical: '10',
      //   backgroundPosition: 'top',
      //   // position: 'absolute',
      //   // bottom: '0'
      //   width: '100VH'
      //   // height: '100vh'
      // }}
      >
        <div className="pt-1 flex pl-7 flex-wrap overflow-hidden xl:-mx-0">
          {!watches ? (
            <>
              {[...new Array(12)].map((_, index) => (
                <div
                  className="pt-3"
                  key={index}
                  style={{
                    backgroundImage: `url(${backGrid})`,
                    backgroundPosition: 'top',
                    backgroundSize: '165px',
                    backgroundRepeat: 'repeat'
                  }}
                >
                  <Skeleton
                    className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                    key={index}
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
                    className="w-full overflow-hidden lg:w-1/6 xl:my-4 xl:px-4 xl:w-1/6"
                    key={content.docId}
                    content={content}
                  />
                </div>
                {/* <img src={woodBorder} alt="" /> */}
              </>
            ))
          ) : (
            <p className="text-center text-2xl">You need to Follow others to see Watches</p>
          )}
        </div>
      </div>
    </div>
  );
}
