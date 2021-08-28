/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';

export default function Footer({ caption, watchName }) {
  return (
    <div className="w-42 pt-6 pl-1 text-left" style={{ fontFamily: 'Buggie' }}>
      <div className="text-2xl w-44 border-b-2">{watchName}</div>
      <div className="text-lg w-44 border-b-2">{caption}</div>
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string,
  watchName: PropTypes.string
};
