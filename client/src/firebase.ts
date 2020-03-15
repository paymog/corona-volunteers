import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCKtQqIhmkjC5MN1Gav0L6NjaW4uVbXH4Q",
  authDomain: "corona-volunteers.firebaseapp.com",
  databaseURL: "https://corona-volunteers.firebaseio.com",
  projectId: "corona-volunteers",
  storageBucket: "corona-volunteers.appspot.com",
  messagingSenderId: "696774040125",
  appId: "1:696774040125:web:3c8a7fdc0371fd8357e854",
  measurementId: "G-N5GQZEN9YL"
};
firebase.initializeApp(config);
export const analytics = firebase.analytics();
