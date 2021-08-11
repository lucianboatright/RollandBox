// import { useState, useEffect, useContext } from 'react';
// import UserContext from '../context/user';
// import { getAvatar } from '../services/firebase';

// export default function useAvatar() {
//   const [avatar, setAvatar] = useState(null);

//   const {
//     user: { uid: userId = '' }
//   } = useContext(UserContext);

//   useEffect(() => {
//     async function getUserAvatar() {
//       const [{ response }] = await getAvatar(userId);
//       setAvatar(response);
//       console.log('Avatar url', avatar);
//     }
//     getUserAvatar();
//   }, [userId]);

//   return { avatar };
// }
