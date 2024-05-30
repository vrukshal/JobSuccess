// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfYaklX0lOnbXJu66SE9gqn5Vn5WeVGDs",
  authDomain: "jobsuccess-98390.firebaseapp.com",
  projectId: "jobsuccess-98390",
  storageBucket: "jobsuccess-98390.appspot.com",
  messagingSenderId: "467138633873",
  appId: "1:467138633873:web:61f2a31c1cddcbe0d09f30",
  measurementId: "G-R2ZY4VRK9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
