// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoNPeN6ZE9hxglUpvYcPWdmBPvivNoce4",
  authDomain: "milkk-c3f45.firebaseapp.com",
  projectId: "milkk-c3f45",
  storageBucket: "milkk-c3f45.appspot.com",
  messagingSenderId: "76040819735",
  appId: "1:76040819735:web:2cbb9240ff8416b8aeb852"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
