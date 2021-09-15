import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function User({ username, fullName, avatar }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/${username}`} className="grid grid-cols-4 gap-4 mb-3 pb-3 items-center border-b-2">
      <div className="items-center pr-1 col-span-1 w-10 invisible sm:invisible h-10 w-10 md:visible w-10 h-10 lg:visible h-10 w-10 xl:visible w-16 h-16">
        <img
          className="rounded-full mr-3 ml-3 shadow-lg invisible sm:invisible md:invisible lg:visible xl:visible"
          src={avatar}
          alt={username}
        />
      </div>
      <div
        className="col-span-3 ml-0 pl-0 sm:ml-3 sm:pl-2 md:ml-3 md:pl-2 lg:ml-3 lg:pl-2 xl:ml-3 xl:pl-2"
        style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
      >
        <p className="text-2xl font-bold text-sm capitalize">{username}</p>
        <p className="text-xl text-sm capitalize">{fullName}</p>
      </div>
    </Link>
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
  avatar: PropTypes.string
};
