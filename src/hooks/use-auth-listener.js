import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useAuthListener() {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const userContext = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  // const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      console.log('AUTHUSER', authUser);
      if (authUser) {
        console.log('only iffff');
        localStorage.setItem('authUser', JSON.stringify(authUser));
        console.log('only iffff 111111', userContext);
        userContext.setUser(authUser);
        console.log('only iffff 22222');
        userContext.setData(getUserByUserId(authUser.uid));
        console.log('WORIGN');
      } else {
        localStorage.removeItem('authUser');
        userContext.setUser(null);
        userContext.setData(null);
      }
    });
    return () => listener();
  }, [firebase]);

  return userContext.user;
}
