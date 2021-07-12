import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyC7p3mdGL8qY_vkyRWA994aqMUGUvJhJAM',
  authDomain: 'mywatchboxweb.firebaseapp.com',
  projectId: 'mywatchboxweb',
  storageBucket: 'mywatchboxweb.appspot.com',
  messagingSenderId: '922169170815',
  appId: '1:922169170815:web:4a8cf6b43d83ffb23e584a'
};

const firebase = Firebase.initializeApp(config);
const { storage } = firebase.storage();
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, storage, FieldValue };
