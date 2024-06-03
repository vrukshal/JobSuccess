const {auth, db} = require('../config/firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { setDoc, doc } = require('firebase/firestore');
const { getAuth } = require("firebase/auth")
const { GoogleAuthProvider, signInWithPopup } = require("firebase/auth");
const { admin } = require("../config/firebase-admin")
async function signupWithEmailAndPassword(req,res) {
    const { firstName, lastName, userType, email, password } = req.body;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    // Now add user data to Firestore
    user_data = {
        created_at: new Date(parseInt(user.metadata.createdAt)).toISOString(),
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        passwordHash: user.reloadUserInfo.passwordHash,
        updated_at: new Date().toISOString(),
        user_id: user.uid
    }
    await setDoc(doc(db, "Users", user.uid), user_data)
    .then(() => {
        // res.status(200).send(body)
        res.status(200).send(user_data);
    })
    .catch((error) => {
        res.status(400).send({ error: error.message });
    });
}

// created_at: new Date(parseInt(user.metadata.createdAt)).toISOString(),
// async function addToFirestore(userId, userData) {
//     await setDoc(doc(db, "Users", userId), userData);
// }

async function loginWithEmailAndPassword(req, res){
    const { email, password } = req.body;
    try {

        const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
        const token = await userCredential.user.getIdToken();
        // const decodedToken = await app.auth().verifyIdToken(token)
        // .then(res.status(200).send(userCredential.user));
        return res.status(200).send(userCredential.user);
      } catch (error) {
        res.status(400).send({ error: error.message });
      }
    // const { token } = req.body;
    // try {
    //     const decodedToken = await auth.verifyIdToken(token);
    //     res.status(200).send(decodedToken);
    // } catch (error) {
    //     res.status(400).send({ error: error.message });
    // }
}

async function signinWithGoogle(req,res){
    
  const { token } = req.body;
  try {
    const temp_auth = getAuth();
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;

      // Perform further actions such as looking up the user in the database
      // and creating a session

      await setDoc(doc(db, "Users", decodedToken.uid), decodedToken)
    .then(() => {
        // res.status(200).send(body)
        console.log("User added to firestore");
    })

      return res.status(200).json(decodedToken);
  } catch (error) {
    console.log(error);
  } 
}

module.exports = {signupWithEmailAndPassword, loginWithEmailAndPassword, signinWithGoogle};

