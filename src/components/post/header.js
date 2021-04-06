import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ username }) {
  return (
    <div className="col-span-2 grid grid-rows-3 grid-flow-col gap-5">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full border h-12 w-8 flex mr-3"
            src={`/images/avatars/${username}.jpg`}
            alt={username}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};
