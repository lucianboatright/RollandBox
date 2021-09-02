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
    <header className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-20 bd-white border-b border-gray-primary mb-2">
      <div className="container ml-5 w-screen-lg h-full">
        <div className="flex justify-center ">
          <div className="cursor-pointer flex-1 inline">
            <div className="w-64 pt-2 inline">
              <span
                className="text-4xl pt-4 pl-1 sm:text-3xl sm:pt-4 md:text-5xl lg:text-5xl xl:text-5xl"
                style={{ fontFamily: 'Acakadut' }}
              >
                Roll & Box
              </span>
            </div>
            <div className="inline">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  className="w-0 pt-1 invisible sm:invisible md:invisible lg:visible xl:visible sm:w-10 lg:w-28 xl:w-28"
                  src={image1}
                  alt="Roll and Box"
                  style={{ width: '8rem' }}
                />
              </Link>
            </div>
          </div>
          <div className="justify-start inline pt-0 ">
            {user ? (
              <>
                <div className="">
                  <Link to={ROUTES.DASHBOARD} aria-label="Dashboard" className="inline">
                    <img
                      src={worldBoxLogo}
                      alt="worldbox"
                      className="pr-1 h-10 sm:h-12 md:h-16 lg:h-16 xl:h-16"
                      // style={{ width: '6rem' }}
                    />
                  </Link>
                  <Link to={`/${user.username}`} aria-label="Dashboard" className="inline">
                    <img
                      src={BoxLogo}
                      alt="worldbox"
                      className="pr-1 h-10 sm:h-12 md:h-16 lg:h-16 xl:h-16"
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
                    <div style={{ paddingTop: '0.5rem' }}>
                      <img
                        src={signOutLogo}
                        alt="worldbox"
                        className="pl-1 pt-0.5 pr-3 sm:h-10 md:h-12 lg:h-12 xl:h-12"
                        // style={{ width: '1.8rem', paddingTop: '0.2rem' }}
                      />
                    </div>
                  </button>
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
