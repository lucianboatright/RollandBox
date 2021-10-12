import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function User({ username, fullName, avatar }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/${username}`} className="flex mb-4 pb-5 items-center border-b-2">
      <div className="items-center pr-1 col-span-1 w-12 invisible sm:invisible md:visible lg:visible lg:w-14 lg:h-14 xl:visible xl:w-14 xl:h-14">
        <img
          className="rounded-full mr-2 pr-0 ml-3 w-16 max-w-none shadow-lg visible sm:visible md:visible lg:visible xl:visible"
          src={avatar}
          alt={username}
        />
      </div>
      <div
        className="mt-1 ml-0 pl-0 sm:ml-3 sm:pl-2 md:ml-4 md:pl-2 lg:ml-3 lg:pl-2 xl:ml-3 xl:pl-2"
        style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
      >
        <p className="text-xl ml-2 font-bold text-sm capitalize">{username}</p>
        <p className="text-xl ml-4 text-sm capitalize">{fullName}</p>
      </div>
    </Link>
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
  avatar: PropTypes.string
};
