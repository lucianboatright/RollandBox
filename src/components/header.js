/* eslint-disable global-require */
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user';
import worldBoxLogo from '../images/svg_png/worldboxlogo.png';
import BoxLogo from '../images/svg_png/box_grid.svg';
import image1 from '../images/watchrollfullopen.webp';

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  const { user } = useUser(loggedInUser?.uid);
  const history = useHistory();

  return (
    <header className="h-18 bd-white border-b border-gray-primary mb-2">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="inline-flex items-center justify-between">
          <div className="flex justify-start text-grey-700 cursor-pointer">
            <div className="mt-2 w-3/12">
              <span className="inline-block align-middle">Roll & Box</span>
            </div>
            <div>
              <Link to={ROUTES.DASHBOARD}>
                <img className="mt-2 w-3/12" src={image1} alt="Roll and Box" />
              </Link>
            </div>
          </div>
          <div className="text-grey-700">
            {user ? (
              <>
                <div className="inline-flex items-center">
                  <Link to={ROUTES.DASHBOARD} aria-label="Dashboard" className="flex-1">
                    <img src={worldBoxLogo} alt="worldbox" className="h-auto w-auto" />
                    {/* <BoxLogo className="w-8 mr-2 text-black-light cursor-pointer" alt="button" /> */}
                  </Link>
                  <Link to={`/${user.username}`} aria-label="Dashboard" className="flex-1">
                    <img src={BoxLogo} alt="worldbox" className="h-14" />
                    {/* <BoxLogo className="w-8 mr-2 text-black-light cursor-pointer" alt="button" /> */}
                  </Link>
                  <button
                    className="flex-1"
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
                    <svg
                      className="w-8 mr-2 text-black-light cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                  <div className="flex-1 cursor-pointer">
                    <Link to={`/${user.username}`}>
                      <img
                        className="rounded-full"
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
