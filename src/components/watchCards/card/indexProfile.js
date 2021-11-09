import PropTypes from 'prop-types';
import Image from './imageProfile';
import Footer from './footerProfile';
import Comments from './commentsProfile';
import paper from '../../../images/borders/paper-1.jpg';

export default function Post({
  imageurl,
  watchName,
  comments,
  watchInfo,
  onClose,
  docId,
  watchUserId,
  userId
}) {
  return (
    <div className="">
      <div className=" h-screen sm:hidden md:hidden lg:hidden xl:hidden">
        <div className="ml-1 mb-3">
          <Image src={imageurl} caption={watchInfo} className="h-10" />
        </div>
        <div
          className="rounded mt-10 ml-1 pb-40"
          style={{
            backgroundImage: `url(${paper})`,
            backgroundPosition: '',
            backgroundSize: '21rem 60rem',
            backgroundRepeat: 'no-repeat',
            fontFamily: 'Buggie',
            color: 'rgb(0,15,85)'
          }}
        >
          <Footer
            caption={watchInfo}
            watchName={watchName}
            docId={docId}
            watchUserId={watchUserId}
            userId={userId}
          />
          <Comments comments={comments} />
        </div>
      </div>
      <div className=" pb-20 hidden sm:block md:block lg:block xl:block">
        <div className="flex flex-row">
          <div className="">
            <Image src={imageurl} caption={watchInfo} />
          </div>
          <div
            className="overflow-auto rounded pb-36 mt-3 ml-4 pl-0 mr-2 w-80 flex flex-col"
            style={{
              backgroundImage: `url(${paper})`,
              backgroundPosition: '',
              backgroundSize: '22rem 37rem',
              backgroundRepeat: 'no-repeat',
              fontFamily: 'Buggie',
              color: 'rgb(0,15,85)',
              height: '33rem'
            }}
          >
            <div className="">
              <div className="inline-block">
                <Footer caption={watchInfo} watchName={watchName} />
              </div>
            </div>
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  onClose: PropTypes.bool,
  imageurl: PropTypes.string,
  watchName: PropTypes.string,
  comments: PropTypes.string,
  watchInfo: PropTypes.string,
  docId: PropTypes.string,
  watchUserId: PropTypes.string,
  userId: PropTypes.string
};
