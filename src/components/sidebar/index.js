import React, { useContext } from 'react';
import User from './user';
import Suggestions from './suggestions';
// import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';

export default function Sidebar() {
  const {
    data: { docId, fullName, username, userId, following, followers }
  } = useContext(UserContext);

  // console.log('useUser', useUser());
  // console.log('username', username);
  // console.log('follewing in index', following);
  // console.log('follewers', followers);
  // console.log('userID', userId);

  return (
    <div className="p-4 mr-10">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        followers={followers}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
