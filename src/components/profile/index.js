import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Watches from './watches';

import { getUserWatchesByUsername } from '../../services/firebase';

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    watchCollection: [],
    followerCount: 0
  };
  const [{ profile, watchCollection, followerCount }, dispatch] = useReducer(reducer, initialState);

  console.log('watches', watchCollection);

  useEffect(() => {
    async function getProfileInfoAndWatches() {
      const watches = await getUserWatchesByUsername(user.username);
      dispatch({ profile: user, watchCollection: watches, followerCount: user.followers.length });
    }
    getProfileInfoAndWatches();
  }, [user.username]);

  return (
    <>
      <Header
        watchesCount={watchCollection ? watchCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Watches watches={watchCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    following: PropTypes.array.isRequired,
    followers: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};
