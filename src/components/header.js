import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserLoggedIn from '../hooks/use-auth-listener';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user';
import worldBoxLogo from '../images/svg_png/worldWatchBoxLogo.png';
import BoxLogo from '../images/svg_png/watchBoxLogoLongHouse.png';
import image1 from '../images/watchRollHeader.png';
import signOutLogo from '../images/svg_png/logout4.svg';

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  const { user } = useUser(loggedInUser?.uid);
  const history = useHistory();
  const isLoggedIn = Object.keys(user).length === 0;

  return (
    <header className="h-12 sm:h-16 md:h-16 lg:h-16 xl:h-16 bd-white border-b border-gray-primary mb-2">
      <div className="">
        <div
          className=""
          style={{
            display: 'grid',
            gridTemplateColumns: '60% 40%'
          }}
        >
          <div className="flex items-center mt-1.5">
            <div
              className="inline text-4xl ml-0 pl-3 sm:text-5xl sm:pl-1 sm:ml-9 md:text-5xl md:pl-1 md:ml-9 lg:text-5xl lg:pl-1 lg:ml-9 xl:text-5xl xl:pl-1 xl:ml-9"
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

          <div className="flex justify-end inline mr-2 sm: md:mr-9 lg:mr-9 xl:mr-9 mb-0 mr-0 sm:mb-3 md:mb-3 lg:mb-3 xl:mb-3">
            {isLoggedIn ? (
              <>
                <div className="justify-end flex items-center">
                  <Link to={ROUTES.LOGIN}>
                    <button
                      type="button"
                      className="bg-blue-700 font-bold text-sm rounded text-white w-20 h-10 mr-2 mt-2"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to={ROUTES.SIGN_UP}>
                    <button
                      type="button"
                      className="font-bold text-sm rounded text-blue-700 w-20 h-10 mt-2 border"
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
                        className="pl-1 pt-0.5 pr-1 h-7 sm:h-9 md:h-9 lg:h-9 xl:h-9"
                      />
                    </div>
                  </button>
                </div>
                <Link to={`/${user.username}`} className="inline cursor-pointer pt-2">
                  <img
                    className="inline rounded-full shadow-lg h-9 sm:h-11 md:h-11 lg:h-11 xl:h-11 hidden sm:block md:block lg:block xl:block"
                    alt="logo"
                    src={user.imageurl}
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
