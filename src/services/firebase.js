// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "SET UP YOUR PROJECT ON FIREBASE",
  authDomain: "SET UP YOUR PROJECT ON FIREBASE",
  projectId: "SET UP YOUR PROJECT ON FIREBASE",
  storageBucket: "SET UP YOUR PROJECT ON FIREBASE",
  messagingSenderId: "SET UP YOUR PROJECT ON FIREBASE",
  appId: "SET UP YOUR PROJECT ON FIREBASE",
  measurementId: "SET UP YOUR PROJECT ON FIREBASE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
