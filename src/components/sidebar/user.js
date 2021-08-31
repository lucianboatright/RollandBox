import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function User({ username, fullName, avatar }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/${username}`} className="grid grid-cols-4 gap-4 mb-3 pb-3 items-center border-b-2">
      <div className="items-center col-span-1 w-10 invisible sm:invisible h-10 w-10 md:visible w-10 h-10 lg:visible h-10 w-10 xl:visible w-10 h-10">
        <img className="rounded-full mr-3 shadow-lg" src={avatar} alt={username} />
      </div>
      <div className="col-span-3 ml-3" style={{ fontFamily: 'Quinngothic' }}>
        <p className="font-bold text-sm capitalize">{username}</p>
        <p className="text-sm capitalize">{fullName}</p>
      </div>
    </Link>
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
  avatar: PropTypes.string
};
