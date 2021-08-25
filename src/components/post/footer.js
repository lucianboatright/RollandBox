/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';

export default function Footer({ caption }) {
  return (
    <div className="has-tooltip w-20 truncate pl-1" style={{ fontFamily: 'Buggie' }}>
      <span className="ml-1 text-xs tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500">
        {caption}
      </span>
      {caption}
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
