import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import image1 from '../images/watchBoxWhite.png';
import BottomBanner from '../components/bottomBanner';

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
    <div>
      <div className="container flex mx-auto max-w-screen-md items-center h-screen">
        <div className="flex w-0 sm:w-3/5 md:w-3/5 lg:w-3/5 ">
          <img src={image1} alt="Watch box" />
        </div>
        <div className="flex flex-col ml-8 w-4/5 sm:w-2/5 ml-0 md:w-2/5 ml-0 lg:w-2/5 ml-0 lx:w-2/5 ml-0">
          <div className="flex flex-col items-center bg-white p-4 border border-grey-primary mb-4 rounded">
            <h1 className="flex justify-center w-full text-4xl" style={{ fontFamily: 'Acakadut' }}>
              <p className="pt-2">Roll & Box</p>
              <div className="flex w-12 mb-2 block sm:hidden md:hidden lg:hidden xl:hidden">
                <img src={image1} alt="Watch box" />
              </div>
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
      <BottomBanner />
    </div>
  );
}
