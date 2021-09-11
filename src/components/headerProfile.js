/* eslint-disable global-require */
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    <header className="h-14 sm:h-20 md:h-20 lg:h-20 xl:h-20 bd-white border-b border-gray-primary mb-2">
      <div className="">
        <div className="flex">
          <div className="flex-grow flex items-center w-1/2 mt-2 mr-0 sm:ml-9 md:-ml-9 lg:ml-9 xl:ml-9">
            {/* <div className="inline"> */}
            <div
              className="inline text-4xl pl-0 sm:text-5xl pl-1 md:text-5xl pl-1 lg:text-5xl pl-1 xl:text-5xl pl-1"
              style={{ fontFamily: 'Acakadut' }}
            >
              Roll & Box
            </div>
            {/* </div> */}
            <div className="inline">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  className="ml-1 w-0 mb-1 invisible sm:visible md:visible lg:visible xl:visible sm:w-24 md:w-24 lg:w-24 xl:w-24"
                  src={image1}
                  alt="Roll and Box"
                  // style={{ width: '3rem' }}
                />
              </Link>
            </div>
          </div>
          {/* <div className="flex-shrink w-auto">
            <span />
          </div> */}
          <div className="flex-grow w-1/2 flex justify-end inline-grid inline mt-3 mb-0 mr-0 sm:mr-9 sm:mb-3 md:-mr-9 md:mb-3 lg:mr-9 lg:mb-3 xl:mr-9 xl:mb-3">
            {user ? (
              <>
                <div className="justify-end flex items-center">
                  <Link to={ROUTES.DASHBOARD} aria-label="Dashboard" className="inline">
                    <img
                      src={worldBoxLogo}
                      alt="worldbox"
                      className="pr-1 h-9 sm:h-14 md:h-14 lg:h-14 xl:h-14"
                      // style={{ width: '6rem' }}
                    />
                  </Link>
                  <Link to={`/${user.username}`} aria-label="Dashboard" className="inline">
                    <img
                      src={BoxLogo}
                      alt="worldbox"
                      className="pr-1 h-9 sm:h-14 md:h-14 lg:h-14 xl:h-14"
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
                    <div style={{ paddingTop: 'rem' }}>
                      <img
                        src={signOutLogo}
                        alt="worldbox"
                        className="pl-1 pt-0.5 h-7 sm:h-11 md:h-11 lg:h-11 xl:h-11"
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
