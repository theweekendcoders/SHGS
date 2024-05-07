// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCoNBy5yX663Z5Ge9BZ1D7EWGSZtJ8OHs",
  authDomain: "shgs-2f579.firebaseapp.com",
  projectId: "shgs-2f579",
  storageBucket: "shgs-2f579.appspot.com",
  messagingSenderId: "215208803306",
  appId: "1:215208803306:web:3d0f6081b124efa74fd093",
  measurementId: "G-R2N3C7RV77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
