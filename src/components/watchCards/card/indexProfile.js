import PropTypes from 'prop-types';
// import { firebase } from '../../../lib/firebase';
import Image from './imageProfile';
import Footer from './footerProfile';
import Comments from './commentsProfile';
import paper from '../../../images/borders/paper-1.jpg';
import deleteLogo from '../../../images/svg_png/deleteWhite.png';

// const db = firebase.firestore();

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
  // const handleDelete = () => {
  //   db.collection('watches')
  //     .doc(docId)
  //     .delete()
  //     .then(() => {
  //       console.log('Deleted Post');
  //     })
  //     .catch((error) => {
  //       console.log('ERROR', error);
  //     });
  //   onClose();
  // };

  return (
    <div className="">
      {/* <div className="rounded col-span-1 border bg-white border-grey-primary"> */}
      <div className="overflow-y-scroll h-screen sm:hidden md:hidden lg:hidden xl:hidden">
        <div className="ml-1 mb-3">
          <Image src={imageurl} caption={watchInfo} className="h-10" />
        </div>
        <div
          className="rounded mt-16 ml-1"
          style={{
            backgroundImage: `url(${paper})`,
            backgroundPosition: '',
            backgroundSize: '23rem 60rem',
            backgroundRepeat: 'no-repeat',
            fontFamily: 'Buggie',
            color: 'rgb(0,15,85)'
          }}
        >
          {/* {watchUserId === userId ? (
            <button type="button" onClick={handleDelete}>
              <img
                alt="delete"
                src={deleteLogo}
                className="pb-2 mt-2 ml-2.5 h-10 w-8"
                // onClick={handleDelete}
              />
            </button>
          ) : (
            <span />
          )} */}
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
            className="overflow-auto rounded pb-32 mt-9 ml-12 pl-4 mr-2 w-1/2 flex flex-col"
            style={{
              backgroundImage: `url(${paper})`,
              backgroundPosition: '',
              backgroundSize: '22rem 37rem',
              backgroundRepeat: 'no-repeat',
              fontFamily: 'Buggie',
              color: 'rgb(0,15,85)',
              height: '30rem'
            }}
          >
            <div className="">
              {/* <div className="inline-block">
                {watchUserId === userId ? (
                  <button type="button" onClick={handleDelete}>
                    <img
                      alt="delete"
                      src={deleteLogo}
                      classNameName="pb-2 mt-2 ml-2.5 h-10 w-8"
                      // onClick={handleDelete}
                    />
                  </button>
                ) : (
                  <span />
                )}
              </div> */}
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
