/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';

export default function Footer({ caption, watchName }) {
  return (
    <div
      className="w-42 pt-7 pl-7 text-left"
      style={{ fontFamily: 'Buggie', color: 'rgb(0,15,85)' }}
    >
      <div className="text-2xl w-48 border-b-2 mb-1">
        <div className="w-42">{watchName}</div>
      </div>
      <div className="text-lg w-48 border-b-2 mb-1">
        <div className="w-42">{caption}</div>
      </div>
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string,
  watchName: PropTypes.string
};
