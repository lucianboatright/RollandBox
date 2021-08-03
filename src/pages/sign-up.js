import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import image1 from '../images/watchbox.jpg';
import { doesUsernameExist } from '../services/firebase';

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  // const allInputs = {imgUrl: ''}
  //   const [imageAsFile, setImageAsFile] = useState('')
  //   const [imageAsUrl, setImageAsUrl] = useState(allImputs)

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernamesExists = await doesUsernameExist(username);
    if (!usernamesExists.lenght) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        //  auth to firbase email, user, address
        await createdUserResult.user.updateProfile({
          displayName: username
        });
        // firebase user collection (creat a document)
        await firebase.firestore().collection('users').doc(createdUserResult.user.uid).set({
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          //  if you want all user to follow me at start add my id in above
          dateCreated: Date.now()
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      }
    } else {
      setUsername('');
      setError('That username is already taken, please try another.');
    }
    // try {
    // } catch (error) {}
  };
  useEffect(() => {
    document.title = 'Sign Up - Watch';
  }, []);

  // console.log(imageAsFile)
  // const handleImageAsFile = (e) => {
  //   const image = e.target.files[0]
  //   setImageAsFile(imageFile => (image))
  // }

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

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter User Name"
              type="text"
              placeholder="Username"
              className="text-sm text-grey-base w-full mr-3 py-5 px-4 h-2 border border-grey-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
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
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-500 text-white w-full border border-grey-primary rounded font-bold
              ${isInvalid && 'opacity-50'}`}
            >
              Sign Up
            </button>
          </form>
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
