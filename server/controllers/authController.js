const {auth, db} = require('../config/firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { setDoc, doc } = require('firebase/firestore');
const { getAuth } = require("firebase/auth")
const { GoogleAuthProvider, signInWithPopup } = require("firebase/auth");

async function signupWithEmailAndPassword(req,res) {
    const { email, password } = req.body;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    // Now add user data to Firestore
    user_data = {
        created_at: new Date(parseInt(user.metadata.createdAt)).toISOString(),
        email: user.email,
        passwordHash: user.reloadUserInfo.passwordHash,
        updated_at: new Date().toISOString(),
        user_id: user.uid
    }
    await setDoc(doc(db, "Users", user.uid), user_data)
    .then(() => {
        // res.status(200).send(body)
        res.status(200).send("User added to firestore");
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
    const { idToken } = req.body;
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
      });
    const auth = getAuth();
    auth.languageCode = 'it';


  try {
    // const credential = auth.GoogleAuthProvider.credential(idToken);
    // const userRecord = await auth.signInWithCredential(credential);
    // const token = await userRecord.user.getIdToken();
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return res.status(200).send(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    res.status(400).send(errorMessage);
  });
  } catch (error) {
    console.log(error);
  } 
}

module.exports = {signupWithEmailAndPassword, loginWithEmailAndPassword, signinWithGoogle};


