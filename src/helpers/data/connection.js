// initializes firebase
import firebase from 'firebase/app';
import apiKeys from '../apiKeys.json';

const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(apiKeys.firebaseKeys);
  }
  // if no firebase apps have been initialized yet, then do this initialization
};

export default firebaseApp;
