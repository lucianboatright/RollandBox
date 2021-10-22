import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { config } from './firebase-config';
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";



const firebase = Firebase.initializeApp(config);
const db = firebase.firestore();
const { FieldValue } = Firebase.firestore;
const { storage } = Firebase.storage();
const app = initializeApp(firebaseConfig);
// const analytics = firebase.analytics();
const analytics = getAnalytics();
logEvent(analytics, 'notification_received');


export { firebase, storage, db, FieldValue };
