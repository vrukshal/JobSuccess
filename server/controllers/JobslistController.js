const { db } = require('../config/firebase');
const { collection, getDocs, query, where } = require('firebase/firestore');

async function getFullTimeJobs(req, res) {
    try {
        const jobsCollection = collection(db, "Jobs");

        // Initialize query with full-time job type constraint
        let constraints = [where("job_type", "==", "full-time")];

        // Loop through query parameters and add constraints
        for (const [key, value] of Object.entries(req.query)) {
            if (key !== "job_type") { // Ensure we don't overwrite the job_type constraint
                constraints.push(where(key, "==", value));
            }
        }

        // Build the final query with the constraints
        const fullTimeQuery = query(jobsCollection, ...constraints);
        const jobsSnapshot = await getDocs(fullTimeQuery);

        const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      //  console.log(jobsList);

        res.status(200).json(jobsList);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving full-time jobs");
    }
}




// async function getFullTimeJobs(req,res){
//     try{
//         const jobsCollection = collection(db, "Jobs");
//         const fullTimeQuery = query(jobsCollection, where("job_type", "==", "full-time"));
//         const jobsSnapshot = await getDocs(fullTimeQuery);
//         const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         console.log(jobsList);
//         return jobsList;
//     }
//     catch(error){
//         console.log(error);
//     }
// }



async function getPartTimeJobs(req, res) {
    try {
        const jobsCollection = collection(db, "Jobs");

        // Initialize query with full-time job type constraint
        let constraints = [where("job_type", "==", "part-time")];

        // Loop through query parameters and add constraints
        for (const [key, value] of Object.entries(req.query)) {
            if (key !== "job_type") { // Ensure we don't overwrite the job_type constraint
                constraints.push(where(key, "==", value));
            }
        }

        // Build the final query with the constraints
        const fullTimeQuery = query(jobsCollection, ...constraints);
        const jobsSnapshot = await getDocs(fullTimeQuery);

        const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        //console.log(jobsList);

        res.status(200).json(jobsList);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving part-time jobs");
    }
}

// async function getPartTimeJobs(req,res) {

//     try{
//         const jobsCollection = collection(db, "Jobs");
//         const partTimeQuery = query(jobsCollection, where("job_type", "==", 'part-time'));
//         const jobsSnapshot = await getDocs(partTimeQuery);
//         const jobsList = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         console.log(jobsList);
//         return jobsList;
//     }
//     catch(error){
//         console.log(error);
//     }
// }

module.exports = {getFullTimeJobs,getPartTimeJobs}
