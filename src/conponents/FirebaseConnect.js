  import * as firebase from 'firebase';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAsTXr8OEXxF79Mq8HwDNk5JWspOEwP38A",
    authDomain: "notereactjs-7b013.firebaseapp.com",
    databaseURL: "https://notereactjs-7b013.firebaseio.com",
    projectId: "notereactjs-7b013",
    storageBucket: "notereactjs-7b013.appspot.com",
    messagingSenderId: "770139900782"
  };
  firebase.initializeApp(config);
export const firebaseUML = firebase.database().ref('DataForNote');