// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDra1Kzq0bEAv4tQMIXEsSLD036xCzdC4w",
  authDomain: "futurewayinfotech.firebaseapp.com",
  databaseURL:
    "https://futurewayinfotech-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "futurewayinfotech",
  storageBucket: "futurewayinfotech.appspot.com",
  messagingSenderId: "58242102839",
  appId: "1:58242102839:web:c35ecae48c4bc4cf8431b2",
  measurementId: "G-87PGVP466G",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp); // Initialize Realtime Database
export const storage = getStorage(firebaseApp); // Initialize Realtime Database

export default firebaseApp;
