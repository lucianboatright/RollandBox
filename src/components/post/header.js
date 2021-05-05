import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ username }) {
  return (
    <div className="col-span-1 grid grid-rows-1 grid-flow-col gap-1 mb-1">
      <div className="flex items-center">
        <Link to={`/${username}`} className="flex items-center p-0">
          <img
            className="rounded-full border h-8 w-8 flex ml-2 mr-3"
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
