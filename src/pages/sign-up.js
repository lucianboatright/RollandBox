import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FireBaseContext from '../context/firebase';
import image1 from '../images/watchbox.jpg';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory;
  const { firebase } = useContext(FireBaseContext);

  const [username, SetUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignup = async (event) => {
    event.preventDefault();

    const usernamesExists = await doesUsernameExist(username);
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
          <h1 className="flex justify-center w-full">
            <p>RollandBox</p>
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter User Name"
              type="text"
              placeholder="Username"
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => SetUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your Full Name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your Email Address"
              type="text"
              placeholder="Email Address"
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
          </form>
          <button
            disabled={isInvalid}
            type="submit"
            className={`bg-blue-500 text-white w-full border border-grey-primary rounded font-bold
            ${isInvalid && 'opacity-50'}`}
          >
            Sign Up
          </button>
        </div>
        <div className="flex justify-center items-center flex-col p-4 rounded border border-grey-primary">
          <p className="text-sm">
            Already have an account? &ensp;
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
