import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getAvatar, getUserByUserId } from '../services/firebase';

export deafault function useAvatar() {
  const [avatar, setAvatar] = useState(null);

  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);

  useEffect(() => { 
    async function getUserAvatar() {
      const avatar = await getAvatar(userId);
      let avatarUrl = [];

      console.log('Avatar url', avatarUrl);
      setAvatar(avatarUrl);

    }
    getUserAvatar();
  }, [userId]);

  return { avatar };
}