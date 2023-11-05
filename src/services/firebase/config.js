// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
import { getStorage  } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdZQ4mcPaWYxnKNgaUUTvd1VziQqZGuOQ",
  authDomain: "eglesblogpage.firebaseapp.com",
  projectId: "eglesblogpage",
  storageBucket: "eglesblogpage.appspot.com",
  messagingSenderId: "155424917626",
  appId: "1:155424917626:web:209ba7256c88cd8f47d3c3",
  measurementId: "G-X1XHGQS4P0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services

const firestore = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);

export { firestore, auth,storage  };