import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBdK1O7UrFLgFhkR4dgzLMatjjIemdRejs",
    authDomain: "fir-demo-8b057.firebaseapp.com",
    projectId: "fir-demo-8b057",
    storageBucket: "fir-demo-8b057.appspot.com",
    messagingSenderId: "574973157631",
    appId: "1:574973157631:web:2a9449cd26cc9799b72cca",
    measurementId: "G-EEBEZCNQPR"
  };

  firebase.initializeApp(firebaseConfig);
  var storage = firebase.storage();

export default storage;
  