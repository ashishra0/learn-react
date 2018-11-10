import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDscYcbok18ER3liuY_dZoq9z87_ekg8j4",
  authDomain: "cotd-react-ashishrao.firebaseapp.com",
  databaseURL: "https://cotd-react-ashishrao.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;