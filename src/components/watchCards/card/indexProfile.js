import PropTypes from 'prop-types';
import Image from './imageProfile';
import Footer from './footerProfile';
import Comments from './commentsProfile';
import paper from '../../../images/borders/paper-1.jpg';

export default function Post({ imageurl, watchName, comments, watchInfo }) {
  return (
    <div className="">
      {/* <div className="rounded col-span-1 border bg-white border-grey-primary"> */}
      <div className="flex flex-row sm:hidden md:hidden lg:hidden xl:hidden">
        <Image src={imageurl} caption={watchInfo} />
        <div
          className="rounded mt-2 ml-2"
          style={{
            backgroundImage: `url(${paper})`,
            backgroundPosition: '',
            backgroundSize: '22rem 60rem',
            backgroundRepeat: 'no-repeat',
            fontFamily: 'Buggie',
            color: 'rgb(0,15,85)'
          }}
        >
          <Footer caption={watchInfo} watchName={watchName} />
          <Comments comments={comments} />
        </div>
      </div>
      <div className=" pb-20 hidden sm:block md:block lg:block xl:block">
        <div className="flex flex-row ">
          <div className="">
            <Image src={imageurl} caption={watchInfo} />
          </div>
          <div
            className="rounded mt-9 ml-12 pl-4 mb-1 mr-2 w-1/2 flex flex-col"
            style={{
              backgroundImage: `url(${paper})`,
              backgroundPosition: '',
              backgroundSize: '22rem 37rem',
              backgroundRepeat: 'no-repeat',
              fontFamily: 'Buggie',
              color: 'rgb(0,15,85)'
            }}
          >
            <Footer caption={watchInfo} watchName={watchName} />
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  imageurl: PropTypes.string,
  watchName: PropTypes.string,
  comments: PropTypes.string,
  watchInfo: PropTypes.string
};
