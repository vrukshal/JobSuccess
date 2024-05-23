// // Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// export { db, auth };

// var admin = require("firebase-admin");

// var serviceAccount = require("./jobsuccess-98390-firebase-adminsdk-y9kut-abfb322ed7.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://jobsuccess-98390-default-rtdb.firebaseio.com/"
// });

// const db = admin.firestore();
// const auth = admin.auth();

module.exports = { db, auth };