const {auth, db} = require('../config/firebase');
const { setDoc, doc } = require('firebase/firestore');

async function createNewApplicant(req,res){
    const applicantInfo = req.body;
    const uid = req.body.uid;
    await setDoc(doc(db, "StudentProfiles", uid), applicantInfo)
    .then(() => {
        // res.status(200).send(body)
        res.status(200).send(applicantInfo);
    })
    .catch((error) => {
        res.status(400).send({ error: error.message });
    });
}

module.exports = {createNewApplicant};