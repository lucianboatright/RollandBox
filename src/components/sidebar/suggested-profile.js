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
    <div className="flex flex-row items-center align-items justify-between w-40">
      <div className="flex items-center justify-between pr-2">
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
      <button
        className="text-sm mx-1 my-1 px-3 py-0.5 border-grey-700 rounded text-white rounded bg-gradient-to-r from-blue-500 to-pink-600 hover:bg-gradient-to-r hover:from-pink-600 hover:to-blue-500 hover:text-blue"
        type="button"
        onClick={handleFollowUser}
        style={{ fontFamily: 'Acakadut' }}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
  avatar: PropTypes.string
};
