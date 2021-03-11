import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import FireBaseContext from '../context/firebase';
import image1 from '../images/watchbox.jpg';

export default function Login() {
  const history = useHistory;
  const { firebase } = useContext(FireBaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const inValid = password === '' || emailAddress === '';

  const handleLogin = () => {};

  useEffect(() => {
    document.title = 'Login - Watch';
  });

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src={image1} alt="Watch box" />
      </div>
      <div className="flex flex-col w-2/5">
        <p>Form holder</p>
      </div>
    </div>
  );
}
