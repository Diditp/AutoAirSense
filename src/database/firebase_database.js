import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA9l109tr2-HylkLkpn85ibNDbdm-OmMoQ",
    authDomain: "autoairsense.firebaseapp.com",
    databaseURL: "https://autoairsense-default-rtdb.firebaseio.com",
    projectId: "autoairsense",
    storageBucket: "autoairsense.appspot.com",
    messagingSenderId: "1098068575996",
    appId: "1:1098068575996:web:27be2ccadbbbcf392ab979",
    measurementId: "G-1ENW0EZW3V"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default database;

