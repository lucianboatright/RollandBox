import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';
import { getWatches, getUserByUserId } from '../services/firebase';

export default function useWatches() {
  const [watches, setWatches] = useState(null);

  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);

  console.log('use-watches', useContext);

  useEffect(() => {
    async function getTimeLineWatches() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserWatches = [];

      console.log('use_watch-hooks', following);

      if (following.length > 0) {
        followedUserWatches = await getWatches(userId, following);
      }
    }

    getTimeLineWatches();
  }, []);

  return { watches };
}
