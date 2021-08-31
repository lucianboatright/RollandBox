import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import image1 from '../images/watchbox.jpg';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernamesExists = await doesUsernameExist(username);
    if (!usernamesExists.lenght) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        await createdUserResult.user.updateProfile({
          displayName: username
        });
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          imageurl: '',
          dateCreated: Date.now()
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
    // try {
    // } catch (error) {}
  };
  useEffect(() => {
    document.title = 'Sign Up - Watch';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src={image1} alt="Watch box" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-grey-primary mb-4 rounded">
          <h1 className="flex justify-center w-full text-4xl" style={{ fontFamily: 'Acakadut' }}>
            <p>Roll & Box</p>
          </h1>
          {error && (
            <p
              className="mb-4 text-s text-center text-red-700"
              style={{ fontFamily: 'Quinngothic' }}
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter User Name"
              type="text"
              placeholder="Username"
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              style={{ fontFamily: 'Quinngothic' }}
              value={username}
            />
            <input
              aria-label="Enter your Full Name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              style={{ fontFamily: 'Quinngothic' }}
              value={fullName}
            />
            <input
              aria-label="Enter your Email Address"
              type="text"
              placeholder="Email Address"
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              style={{ fontFamily: 'Quinngothic' }}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              style={{ fontFamily: 'Quinngothic' }}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              style={{ fontFamily: 'Acakadut' }}
              className={`bg-blue-500 text-white w-full border border-grey-primary rounded text-s my-1 py-1
              ${isInvalid && 'opacity-50'}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col p-4 rounded border border-grey-primary">
          <p className="text-sm" style={{ fontFamily: 'Quinngothic' }}>
            Have an account? &ensp;
            <Link
              to={ROUTES.LOGIN}
              className="bg-blue-500 opacity-50 px-4 py-1 text-xl rounded text-white hover:opacity-100"
              style={{ fontFamily: 'Acakadut' }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
