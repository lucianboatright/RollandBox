import React from 'react';
import User from './user';
import Suggestions from './suggestions';
import useUser from '../../hooks/use-user';

export default function Sidebar() {
  const {
    user: { fullName, username, userId, following }
  } = useUser();

  // console.log('useUser', useUser());
  // console.log('username', username);
  // console.log('follewing', following);

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} following={following} />
    </div>
  );
}
