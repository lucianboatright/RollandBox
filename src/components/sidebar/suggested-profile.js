import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
  avatar
}) {
  const [followed, setFollowed] = useState(false);
  async function handleFollowUser() {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }
  return !followed ? (
    <div className="ml-5 flex flex-row align-items ">
      <div className="flex items-center pr-2">
        <img
          className="rounded-full w-8 mr-2 shadow-lg"
          style={{ fontFamily: 'Quinngothic' }}
          src={avatar.imageurl}
          alt={username}
        />
        <Link to={`/${username}`}>
          <p
            className="font-bold text-sm capitalize text-ink"
            style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
          >
            {username}
          </p>
        </Link>
      </div>
      <div className="ml-auto pl-9 mr-11 hidden w-1 sm:hidden w-1 md:block lg:block xl:block">
        <button
          className="text-sm mx-1 my-1 px-3 py-0.5 border-grey-700 rounded text-white rounded hover:text-blue"
          type="button"
          onClick={handleFollowUser}
          style={{ fontFamily: 'Acakadut', backgroundColor: '#e69597' }}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
  avatar: PropTypes.object
};
