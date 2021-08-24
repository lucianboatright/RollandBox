import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function User({ username, fullName, avatar }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/${username}`} className="grid grid-cols-4 gap-4 mb-3 pb-3 items-center border-b-2">
      <div className="flex items-center justify-between col-span-1">
        <img className="rounded-full w-16 flex mr-3" src={avatar} alt={username} />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
  avatar: PropTypes.string
};
