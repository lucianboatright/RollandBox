/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types';

export default function Footer({ caption }) {
  return (
    <div className="">
      <span className="font-bold ml-1 text-xs">{caption}</span>
    </div>
  );
}

Footer.propType = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
