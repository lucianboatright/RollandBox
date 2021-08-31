/* eslint-disable global-require */
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user';
import worldBoxLogo from '../images/svg_png/TestWorldBox.png';
import BoxLogo from '../images/svg_png/watchBoxLogoLongHouse.png';
import image1 from '../images/watchrollfullopen.webp';
import signOutLogo from '../images/svg_png/logout4.svg';

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  const { user } = useUser(loggedInUser?.uid);
  const history = useHistory();

  return (
    <header className="h-18 bd-white border-b border-gray-primary">
      <div className="container ml-5 w-screen-lg h-full">
        <div className="flex w-screen justify-center">
          <div className="cursor-pointer pl-5 flex-1 inline sm:mt-2 md:mt-2 lg:mt-2 xl:mt-2">
            <div className="w-64 pt-2 inline">
              <span
                className="text-4xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-5xl"
                style={{ fontFamily: 'Acakadut' }}
              >
                Roll & Box
              </span>
            </div>
            <div className="inline">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  className=" w-0 invisible sm:invisible md:invisible lg:visible xl:visible sm:w-10 lg:w-28 xl:w-28"
                  src={image1}
                  alt="Roll and Box"
                  style={{ maxWidth: '30rem' }}
                />
              </Link>
            </div>
          </div>
          <div className="justify-end inline pr-5">
            {user ? (
              <>
                <div className="pt-1">
                  <Link to={ROUTES.DASHBOARD} aria-label="Dashboard" className="inline">
                    <img
                      src={worldBoxLogo}
                      alt="worldbox"
                      className="pr-2"
                      style={{ width: '5.3rem' }}
                    />
                  </Link>
                  <Link to={`/${user.username}`} aria-label="Dashboard" className="inline">
                    <img
                      src={BoxLogo}
                      alt="worldbox"
                      className="pr-3"
                      style={{ width: '5.4rem' }}
                    />
                  </Link>
                  <button
                    className="inline"
                    type="button"
                    title="sign-out"
                    onClick={() => {
                      firebase.auth().signOut();
                      history.push(ROUTES.LOGIN);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        firebase.auth().signOut();
                        history.push(ROUTES.LOGIN);
                      }
                    }}
                  >
                    <img
                      src={signOutLogo}
                      alt="worldbox"
                      className="h-12 pr-2"
                      style={{ maxWidth: '10rem' }}
                    />
                  </button>
                  <div className="cursor-pointer inline pr-1">
                    <Link to={`/${user.username}`}>
                      <img
                        className="rounded-full shadow-lg"
                        alt="logo"
                        style={{ width: '3rem' }}
                        src={user.imageurl}
                      />
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-700 font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Login
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-700 w-20 h-8 border"
                  >
                    Sign-Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* eslint-disable global-require */
