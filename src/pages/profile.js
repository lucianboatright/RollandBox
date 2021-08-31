import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/headerProfile';
import UserProfile from '../components/profile';
import UserContext from '../context/user';

export default async function Profile() {
  // const userContext = useContext(UserContext);
  // const user = userContext.data;
  const { username } = useParams();
  // const [user, setUser] = useState(null);
  const history = useHistory();
  const [profileUser] = await getUserByUsername(username);

  // useEffect(() => {
  //   async function checkUserExists() {
  //     const [user] = await getUserByUsername(username);
  //     if (user?.userId) {
  //       setUser(user);
  //     } else {
  //       history.push(ROUTES.NOT_FOUND);
  //     }
  //   }
  //   checkUserExists();
  // }, [username, history]);
  // console.log('profile user', userContext);
  return profileUser?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={profileUser} />
      </div>
    </div>
  ) : null;
}
