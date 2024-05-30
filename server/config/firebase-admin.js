const admin = require('firebase-admin');
const serviceAccount = require('./jobsuccess-98390-firebase-adminsdk-y9kut-abfb322ed7.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jobsuccess-98390-default-rtdb.firebaseio.com/"
});

module.exports = { admin };