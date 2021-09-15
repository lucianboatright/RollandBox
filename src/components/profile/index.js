import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Watches from './watches';

import { getUserWatchesByUsername, getUserPostsByUsername } from '../../services/firebase';
// import { getUserPostsByUsername } from '../../services/firebase';

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    watchCollection: [],
    followerCount: 0,
    postsCollection: []
  };
  const [{ profile, watchCollection, followerCount, postsCollection }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndWatches() {
      const watches = await getUserWatchesByUsername(user.username);
      dispatch({ profile: user, watchCollection: watches, followerCount: user.followers.length });
    }
    getProfileInfoAndWatches();

    async function getProfilePosts() {
      const posts = await getUserPostsByUsername(user.username);
      dispatch({ profile: user, postsCollection: posts });
    }
    getProfilePosts();
  }, [user.username]);

  return (
    <>
      <Header
        watchesCount={watchCollection ? watchCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Watches watches={watchCollection} profile={profile} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
    fullName: PropTypes.string,
    username: PropTypes.string,
    userId: PropTypes.string,
    imageurl: PropTypes.string
  })
};
