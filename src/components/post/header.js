import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ username, avatar }) {
  const test = avatar[0];
  return (
    <div className="col-span-1 grid grid-rows-1 grid-flow-col gap-1 ">
      <div className="flex items-center">
        <Link to={`/${username}`} className="flex items-center p-0">
          <img
            className="rounded-full border h-6 w-6 flex ml-2 mr-3"
            src={test.imageurl}
            alt={username}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.array
};
