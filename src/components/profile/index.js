import { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import Watches from './watches';
// import useAvatar from '../hooks/use-avatar';

import { getAvatar, getUserWatchesByUsername } from '../../services/firebase';
// import { SettingsInputCompositeSharp } from '@material-ui/icons';

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    watchCollection: [],
    followerCount: 0
  };
  const [{ profile, watchCollection, followerCount }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getProfileInfoAndWatches() {
      const watches = await getUserWatchesByUsername(user.username);
      dispatch({ profile: user, watchCollection: watches, followerCount: user.followers.length });
      const avatar = await getAvatar(user.userId);
      console.log('INSIODE INDEX', avatar);
    }
    getProfileInfoAndWatches();
    // eslint-disable-next-line
  }, [user.username]);

  // useEffect(() => {
  //   firebase.collections('watches').onSnapshot((snapshot) => {
  //     setPosts(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         post: doc.data()
  //       }))
  //     );
  //   });
  // }, []);

  console.log('index_watch collection', watchCollection);

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
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
    fullName: PropTypes.string,
    username: PropTypes.string,
    userId: PropTypes.string
  })
};
