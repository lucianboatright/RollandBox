import { useState, useEffect, useContext } from 'react';
import { getUserByUserId } from '../services/firebase';
import UserContext from '../context/user';

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      console.log('USERID', user.uid);
      console.log('USERID USER', user);
      const response = await getUserByUserId(user.uid);
      console.log('SetActive user', response);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId(user.uid);
    }
  }, [user]);
  // console.log('activeuser Followers', activeUser.followers);
  console.log('activeuser Following', activeUser);
  return { user: activeUser };
}
