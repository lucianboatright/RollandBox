import React from 'react';
import User from './user';
import Suggestions from './suggestions';
import useUser from '../../hooks/use-user';

export default function Sidebar() {
  const {
    user: { docId, fullName, username, userId, following, followers, imageurl }
  } = useUser();

  return (
    <div className="pl-2 pt-4 pr-4 border-l-2 border-grey-600 visible sm:visible md:visible lg:visible xl:visible">
      <User username={username} fullName={fullName} avatar={imageurl} />
      <Suggestions
        userId={userId}
        following={following}
        followers={followers}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
