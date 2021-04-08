import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import { getUserByUsername, getUserWatchesByUsername } from '../../services/firebase';

export default function Profile({ username }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    watchCollection: [],
    followerCount: 0
  };

  const [{ profile, watchCollections, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndWatches() {
      const [{ ...user }] = await getUserByUsername(username);
      const watches = getUserWatchesByUsername;
      dispatch({ profile: user, watchCollection: watches, followerCount: user.followers.length });
    }
    if (username) {
      getProfileInfoAndWatches();
    }
  }, [username]);

  return (
    <>
      <Header />
    </>
  );
}

Profile.propTypes = {
  username: PropTypes.string.isRequired
};
