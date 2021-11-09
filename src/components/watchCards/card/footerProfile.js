/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';
import { firebase } from '../../../lib/firebase';
import deleteLogo from '../../../images/svg_png/deleteWhite.png';

const db = firebase.firestore();

export default function Footer({ caption, watchName, docId, watchUserId, userId }) {
  const handleDelete = () => {
    db.collection('watches')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('Deleted Post');
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
    // onClose();
  };
  return (
    <div
      className="w-60 pt-2 pl-4 text-left"
      style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}
    >
      <div className="text-4xl border-b-2 mb-2 mt-2 flex justify-between">
        <div className=" inline">{watchName}</div>
        <div className="inline mt-1 ">
          {watchUserId === userId ? (
            <button type="button" onClick={handleDelete}>
              <img
                style={{ maxWidth: '20rem' }}
                alt="delete"
                src={deleteLogo}
                classNameName="pb-2 mt-2 ml-3 h-20 w-20 max-w-20"
                // onClick={handleDelete}
              />
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
      <div className="text-xl w-60 border-b-2 mb-2" style={{ whiteSpace: 'pre-wrap' }}>
        <div className="w-68">{caption}</div>
      </div>
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string,
  watchName: PropTypes.string,
  docId: PropTypes.string,
  watchUserId: PropTypes.string,
  userId: PropTypes.string
};
