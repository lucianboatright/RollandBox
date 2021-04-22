/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';

export default function Footer({ caption, username }) {
  return (
    <div className="p-2 pt-0 pb-0">
      <span className="mr-1 font-bold text-xs">{username}</span>
      <span className="text-xs">{caption}</span>
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
