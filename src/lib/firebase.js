import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { config } from './firebase-config';

const firebase = Firebase.initializeApp(config);
const db = firebase.firestore();
const { FieldValue } = Firebase.firestore;
const { storage } = Firebase.storage();

export { firebase, storage, db, FieldValue };
