import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const realtime = getDatabase(app);
// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);

export { realtime, firestore };
