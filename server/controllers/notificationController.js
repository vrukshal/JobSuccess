const { db } = require('../config/firebase');
const { collection, getDocs,getDoc, query, where, addDoc,orderBy,doc } = require('firebase/firestore');

async function getStudentNotification(req,res){
    try {
        const { studentUid } = req.query;
        const q = query(collection(db, "Notifications"), where("studentUid", "==", studentUid));

        const querySnapshot = await getDocs(q);
        const NotiList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(NotiList);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving notifications ");
    }
}

module.exports = {getStudentNotification}