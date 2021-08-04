import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
  apiKey: "AIzaSyA0Q-9-77_DuiVEqRnWVgCORkIdeoELH1I",
  authDomain: "boardapp-43ce0.firebaseapp.com",
  projectId: "boardapp-43ce0",
  storageBucket: "boardapp-43ce0.appspot.com",
  messagingSenderId: "96388274004",
  appId: "1:96388274004:web:25c807b253aa8e57e45ac1",
  measurementId: "G-PDXVF1KH0E"
};
// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;