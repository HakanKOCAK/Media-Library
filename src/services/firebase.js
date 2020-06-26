import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR API KEY',
  authDomain: 'YOUR AUTH DOMAIN',
  databaseURL: 'YOUR DATABASE URL',
  projectId: 'YOUR PROJECT ID',
  storageBucket: 'YOUR STORAGE BUCKET',
  messagingSenderId: 'YOUR MESSAGING SENDER ID',
  appId: 'YOUR APP ID',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export default auth;
