import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getWatches, getUserByUserId } from '../services/firebase';

export default function useWatches() {
  const [watches, setWatches] = useState(null);

  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimeLineWatches() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserWatches = [];

      if (following.length > 0) {
        followedUserWatches = await getWatches(userId, following);
      }
      followedUserWatches.sort((a, b) => b.dateAdded - a.dateAdded);
      setWatches(followedUserWatches);
    }

    getTimeLineWatches();
  }, [userId]);

  return { watches };
}
