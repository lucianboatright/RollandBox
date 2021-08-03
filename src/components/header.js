/* eslint-disable global-require */
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import { ReactComponent as BoxLogo } from '../images/svg_png/grid_logo_2.svg';
import image1 from '../images/watchrollfullopen.webp';
// import NewWatch from './newWatch/newWatch';

export default function Header() {
  const userContext = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  // const { user } = useUser(loggedInUser?.uid);
  const history = useHistory();

  return (
    <header className="h-18 bd-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-grey-700 cursor-pointer">
            <h1 className="flex justify-center w-full">
              <p className="text-grey-700 flex flex-row items-center justify-between text-2xl">
                Roll & Box
              </p>
              <Link to={ROUTES.DASHBOARD}>
                <img className="mt-2 w-2/12 " src={image1} alt="Roll and Box" />
              </Link>
              {/* <p className="text-grey-700 text-center flex items-center aligh-items"> Roll & Box</p> */}
            </h1>
          </div>
          <div className="text-grey-700 text-center flex items-center align-items align-items">
            {/* <div className="flex items-center justify-evenly flex-col col-span">
              <div style={BUTTON_WRAPPER} className="container mr-2">
                <button
                  className="bg-pink-600 font-bold text-sm  rounded text-white pr-5 pl-5 h-10"
                  type="button"
                  onClick={handdleNewpost}
                >
                  New Watch
                </button>
                <NewWatch>inside</NewWatch>
              </div>
            </div> */}
            {userContext.data ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <BoxLogo className="w-8 mr-2 text-black-light cursor-pointer" alt="button" />
                </Link>
                <button
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
                <div className="flex item-center cursor-pointer">
                  <Link to={`/${userContext.data.username}`}>
                    <img
                      className="rounded-full h8 w-8 flex"
                      alt="logo"
                      style={{ width: 170 }}
                      src={`../images/avatars/${userContext.data.username}.jpg`}
                    />
                  </Link>
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
