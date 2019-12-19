import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyC4mwQm91MREed1EpmG7ATVClhqpRMisL4",
    authDomain: "instagramclone-c1bde.firebaseapp.com",
    databaseURL: "https://instagramclone-c1bde.firebaseio.com",
    projectId: "instagramclone-c1bde",
    storageBucket: "instagramclone-c1bde.appspot.com",
    messagingSenderId: "62380934641",
    appId: "1:62380934641:web:3eebb6f3f90572a0d8b050",
    measurementId: "G-156L8EC8PH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export const f = firebase
export const database = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()