/* eslint-disable */
import {useState} from 'react';
import PropTypes from 'prop-types';

export default function SuggestedProfile({ userDocId, username, profileId, userId }) {
  const [followed, setFollowed] = useState(false);

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img 
          className="rounded-full w-8 flex mr-3"
          src={`./images/avatars/${username}.jpg`}
          alt={username}
        />
      </div>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired
};

/* eslint-disable */
