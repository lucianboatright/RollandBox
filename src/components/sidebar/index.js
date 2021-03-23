import React from 'react';
import User from './user';
import useUser from '../../hooks/use-user';
import Suggestions from './suggestions';

export default function Sidebar() {
  const {
    user: { fullName, username, userId }
  } = useUser();
  const [test, setTest] = React.useState(0);

  return (
    <div className="p-4">
      <button
        className="border"
        type="button"
        onClick={() => {
          console.log(`fullName ${fullName} username ${username}`);
        }}
      >
        test
      </button>
      <User username={username} fullName={fullName} test={test} />
      <Suggestions userId={userId} />
    </div>
  );
}
