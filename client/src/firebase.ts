// these configs have been invalidated and ignored on paymahn's machine with https://stackoverflow.com/questions/4348590/how-can-i-make-git-ignore-future-revisions-to-a-file

import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCqGXvpieI1Dep8S4dTrt-QzigPoSx3eNI",
  authDomain: "corona-volunteers-dev.firebaseapp.com",
  databaseURL: "https://corona-volunteers-dev.firebaseio.com",
  projectId: "corona-volunteers-dev",
  storageBucket: "corona-volunteers-dev.appspot.com",
  messagingSenderId: "562084608728",
  appId: "1:562084608728:web:e87f86b6f11e42edf135ad",
  measurementId: 'fakeid'
};

if (process.env.NODE_ENV === 'production') {
  config = {
    apiKey: "AIzaSyCKtQqIhmkjC5MN1Gav0L6NjaW4uVbXH4Q",
    authDomain: "corona-volunteers.firebaseapp.com",
    databaseURL: "https://corona-volunteers.firebaseio.com",
    projectId: "corona-volunteers",
    storageBucket: "corona-volunteers.appspot.com",
    messagingSenderId: "696774040125",
    appId: "1:696774040125:web:3c8a7fdc0371fd8357e854",
    measurementId: "G-N5GQZEN9YL"
  };
}

firebase.initializeApp(config);
export const analytics = firebase.analytics();
