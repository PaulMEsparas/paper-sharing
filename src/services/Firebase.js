import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4gGaTUqwmrS-Y0GjvvSeefQwLVDl-PzA",
  authDomain: "papersharing-46558.firebaseapp.com",
  projectId: "papersharing-46558",
  storageBucket: "papersharing-46558.appspot.com",
  messagingSenderId: "1079720654042",
  appId: "1:1079720654042:web:a3f8374cade12722d7a1e3",
  measurementId: "G-P272F19X4J",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
