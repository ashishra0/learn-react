import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "",
  authDomain: "cotd-react-ashishrao.firebaseapp.com",
  databaseURL: "https://cotd-react-ashishrao.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;