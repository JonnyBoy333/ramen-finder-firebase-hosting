import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDcxnq1g4c85WaeY6rRUS17_CdSP3hi7u4',
  authDomain: 'react-firebase-authentic-9e958.firebaseapp.com',
  databaseURL: 'https://react-firebase-authentic-9e958.firebaseio.com',
  messagingSenderId: '970439036549',
  projectId: 'react-firebase-authentic-9e958',
  storageBucket: 'react-firebase-authentic-9e958.appspot.com',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.database();
const auth = firebase.auth();
// const functions = firebase.functions();

export {
  db,
  auth
}