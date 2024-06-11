const {auth, db} = require('../config/firebase');
const { setDoc, doc } = require('firebase/firestore');

async function createNewRecruiter(req,res){
    const recruiterInfo = req.body;
    const uid = req.body.uid;
    await setDoc(doc(db, "EmployerProfiles", uid), recruiterInfo)
    .then(() => {
        // res.status(200).send(body)
        res.status(200).send(recruiterInfo);
    })
    .catch((error) => {
        res.status(400).send({ error: error.message });
    });
}

module.exports = {createNewRecruiter};