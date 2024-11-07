import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrYJvhkP9ufz2qIyRn_J6tG-tGJNGd4R0",
  authDomain: "filmvault-826b0.firebaseapp.com",
  projectId: "filmvault-826b0",
  storageBucket: "filmvault-826b0.firebasestorage.app",
  messagingSenderId: "320417187700",
  appId: "1:320417187700:web:a44e4ce28f22f83a758e21",
  measurementId: "G-75939CKJZC"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();