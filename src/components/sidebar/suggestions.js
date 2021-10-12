/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

export default function Suggestions({ userId, following, followers, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following, followers);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following, followers]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-md flex items-center mb-1">
        <p
          className="ml-4 font-bold text-gray-base"
          style={{ fontFamily: 'Quinngothic', color: 'rgb(0,15,85)' }}
        >
          Suggested Users
        </p>
      </div>
      <div className="mt-1">
        {profiles.map((profile) => (
          <div className="pt-2 w-max">
            <SuggestedProfile
              key={profile.docId}
              profileDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
              loggedInUserDocId={loggedInUserDocId}
              avatar={profile}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  followers: PropTypes.array,
  loggedInUserDocId: PropTypes.string
};
