import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { config } from './firebase-config';

// import { seedDatabase } from '../seed';

const firebase = Firebase.initializeApp(config);
const db = firebase.firestore();
const { FieldValue } = Firebase.firestore;
const { storage } = Firebase.storage();

// seedDatabase(firebase);

export { firebase, storage, db, FieldValue };
