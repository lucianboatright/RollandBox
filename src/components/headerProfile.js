import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserLoggedIn from '../hooks/use-auth-listener';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user';
import worldBoxLogo from '../images/svg_png/worldWatchBoxLogo.png';
import BoxLogo from '../images/svg_png/watchBoxLogoLongHouse.png';
import image1 from '../images/watchrollfullopen.webp';
import signOutLogo from '../images/svg_png/logout4.svg';

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  const { user } = useUser(loggedInUser?.uid);
  const history = useHistory();
  const testLength = UserLoggedIn.length;
  const isLoggedIn = Object.keys(user).length === 0;

  return (
    <header className="h-12 sm:h-16 md:h-16 lg:h-16 xl:h-16 bd-white border-b border-gray-primary mb-2">
      <div className="">
        <div className="flex">
          <div className="flex-grow flex items-center  w-1/2 mt-1.5 mr-0 sm:ml-9 md:-ml-9 lg:ml-9 xl:ml-9">
            <div
              className="inline text-4xl ml-3 sm:text-5xl pl-1 sm:ml-0 md:text-5xl md:ml-0 pl-1 lg:text-5xl lg:ml-0 pl-1 xl:text-5xl xl:ml-0 pl-1"
              style={{ fontFamily: 'Acakadut' }}
            >
              Roll & Box
            </div>
            <div className="inline">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  className="ml-1 w-0 mb-1 invisible sm:visible md:visible lg:visible xl:visible sm:w-24 md:w-24 lg:w-24 xl:w-24"
                  src={image1}
                  alt="Roll and Box"
                />
              </Link>
            </div>
          </div>
          <div className="flex-grow w-1/2 flex justify-end inline-grid inline mb-0 mr-0 sm:mr-9 sm:mb-3 md:-mr-9 md:mb-3 lg:mr-9 lg:mb-3 xl:mr-9 xl:mb-3">
            {isLoggedIn ? (
              <>
                <div className="justify-end flex items-center">
                  <Link to={ROUTES.LOGIN}>
                    <button
                      style={{ fontFamily: 'Acakadut', backgroundColor: '#e69597' }}
                      type="button"
                      className="bg-blue-700 font-bold text-sm rounded text-white w-20 h-10 mr-2 mt-2 text-lg"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to={ROUTES.SIGN_UP}>
                    <button
                      type="button"
                      style={{ fontFamily: 'Acakadut' }}
                      className="font-bold text-sm rounded text-blue-700 w-20 h-10 mt-2 border text-lg"
                    >
                      Sign-Up
                    </button>
                  </Link>
                </div>
              </>
            ) : (
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
                        className="pl-1 pt-0.5 h-7 mr-3 sm:h-11 sm:mr-0 md:h-11 md:mr-0 lg:h-11 lg:mr-0 xl:h-11 xl:mr-0"
                        // style={{ width: '1.8rem', paddingTop: '0.2rem' }}
                      />
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
