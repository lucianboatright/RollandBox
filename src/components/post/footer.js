/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';

export default function Footer({ caption, watchName }) {
  return (
    <div className="has-tooltip w-20 truncate pl-1 text-sm" style={{ fontFamily: 'Buggie' }}>
      <span className="ml-1 tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500">
        {watchName}
        <br />
        <div style={{ whiteSpace: 'pre-wrap' }}>{caption}</div>
      </span>
      {watchName}
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  watchName: PropTypes.string
};
