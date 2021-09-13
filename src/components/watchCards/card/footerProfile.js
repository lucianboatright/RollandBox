/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';

export default function Footer({ caption, watchName }) {
  return (
    <div
      className="w-42 pt-2 pl-4 text-left"
      style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}
    >
      <div className="text-4xl w-60 border-b-2 mb-2">
        <div className="w-68">{watchName}</div>
      </div>
      <div className="text-xl w-60 border-b-2 mb-2" style={{ whiteSpace: 'pre-wrap' }}>
        <div className="w-68">{caption}</div>
      </div>
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string,
  watchName: PropTypes.string
};
