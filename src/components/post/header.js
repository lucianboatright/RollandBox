import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header({ username, avatar }) {
  const watch = avatar[0];
  return (
    <div className="" style={{ color: 'rgb(0,15,85)' }}>
      <div className="mt-4">
        <Link to={`/${username}`} className="flex items-center pt-2">
          <img
            className="rounded-full border h-9 w-9 flex ml-1 mr-3"
            src={watch.imageurl}
            alt={username}
          />
          <p className="font-bold capitalize text-xl" style={{ fontFamily: 'Buggie' }}>
            {username}
          </p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.array
};
