// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: "photoalbum-87fff",
  storageBucket: "photoalbum-87fff.appspot.com",
  messagingSenderId: "549233059971",
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();