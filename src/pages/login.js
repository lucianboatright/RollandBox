import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import FireBaseContext from '../context/firebase';

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
      <p>OHH LAA DII DAA</p>
    </div>
  );
}
