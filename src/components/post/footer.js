/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';

export default function Footer({ caption, username }) {
  return (
    <div className="">
      {/* <span className="ml-1 font-bold text-xs">{username}</span> */}
      <span className="font-bold ml-1 text-xs">{caption}</span>
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
