import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import image1 from '../images/watchbox.jpg';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      // If there is an erroer reset the vcalues to nothing
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - RollandBox';
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

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              style={{ fontFamily: 'Quinngothic' }}
              type="text"
              placeholder="Email Address ..."
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              style={{ fontFamily: 'Quinngothic' }}
              type="password"
              placeholder="Password ..."
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              style={{ fontFamily: 'Acakadut' }}
              type="submit"
              className={`bg-blue-500 text-white w-full border border-grey-primary rounded text-s my-1 py-1
              ${isInvalid && 'opacity-50'}`}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col p-4 rounded border border-grey-primary">
          <p className="text-sm" style={{ fontFamily: 'Quinngothic' }}>
            New Account? &ensp;
            <Link
              to={ROUTES.SIGN_UP}
              style={{ fontFamily: 'Acakadut' }}
              className="bg-blue-500 opacity-50 border border-grey-primary px-2 py-1 rounded text-white text-xl hover:opacity-100"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
