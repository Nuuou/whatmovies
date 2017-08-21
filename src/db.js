import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCiQfgxKg9A6T0-gakVrxkCR2Y2-gfxOtA",
    authDomain: "whatmovies-fdc71.firebaseapp.com",
    databaseURL: "https://whatmovies-fdc71.firebaseio.com",
    projectId: "whatmovies-fdc71",
    storageBucket: "whatmovies-fdc71.appspot.com",
    messagingSenderId: "618808179878"
};
const fb_app = firebase.initializeApp(config);
const fb_database = fb_app.database();

export default fb_database;