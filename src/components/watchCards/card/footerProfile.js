/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';

export default function Footer({ caption, watchName }) {
  return (
    <div className="w-42 pt-6 pl-1 text-left" style={{ fontFamily: 'Buggie' }}>
      <div className="text-2xl w-46 border-b-2 mb-1">
        <div className="w-40">{watchName}</div>
      </div>
      <div className="text-lg w-46 border-b-2 mb-1">
        <div className="w-40">{caption}</div>
      </div>
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string,
  watchName: PropTypes.string
};
