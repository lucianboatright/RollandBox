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
          className="rounded-full w-8 flex mr-2 shadow-lg"
          src={avatar.imageurl}
          alt={username}
        />
        <Link to={`/${username}`}>
          <p className="font-bold text-sm text-pink-600 capitalize">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs mx-1 my-1 px-1 py-0.5 border-l-2 border-grey-700 rounded font-bold text-blue-700 hover:bg-blue-400 hover:text-white"
        type="button"
        onClick={handleFollowUser}
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
