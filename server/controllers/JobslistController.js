const { db } = require('../config/firebase');
const { collection, getDocs, query, where, addDoc,orderBy } = require('firebase/firestore');

async function getFullTimeJobs(req, res) {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).send("Missing userId in query parameters");
        }

        const jobsCollection = collection(db, "Jobs");

        // Initialize query with full-time job type constraint
        let constraints = [where("employmentType", "==", "full-time"),orderBy("posted_at", "desc")];

        // Loop through query parameters and add constraints
        for (const [key, value] of Object.entries(req.query)) {
            if (key !== "employmentType" && key !== "userId") { // Ensure we don't overwrite the job_type and userId constraint
                constraints.push(where(key, "==", value));
            }
        }

        // Build the final query with the constraints
        const fullTimeQuery = query(jobsCollection, ...constraints);
        const jobsSnapshot = await getDocs(fullTimeQuery);

        const allJobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
       // console.log(allJobs.map(job => job.id));
        // Retrieve Job IDs the user has applied for
        const applicationsRef = collection(db, "Applications");
        const appliedJobsQuery = query(applicationsRef, where("studentInfo.uid", "==", userId));
        const appliedJobsSnapshot = await getDocs(appliedJobsQuery);
       // console.log(appliedJobsSnapshot.docs.map(j => j.data()));

        const appliedJobIds = new Set(appliedJobsSnapshot.docs.map(doc => doc.data().jobId));
        // Filter out applied jobs from all jobs
        //console.log(appliedJobIds);
        const unappliedJobs = allJobs.filter(job => !appliedJobIds.has(job.id));
        //console.log(unappliedJobs.length);
        res.status(200).json(unappliedJobs);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving full-time jobs");
    }
}


async function getJobsByRecruiterUid(req,res){
    try {
        const { recruiterUid } = req.query;
        const q = query(collection(db, "Jobs"), where("recruiterUid", "==", recruiterUid));

        const querySnapshot = await getDocs(q);
        const jobsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(jobsList);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving full-time jobs");
    }
}


async function createNewJobPost(req, res){
    try {
        const jobData = req.body;
        jobData.posted_at = new Date().toISOString();
        const newJobRef = collection(db, "Jobs");
        await addDoc(newJobRef, jobData);
        res.status(200).json({ success: true, id: newJobRef.id, jobData: jobData });
      } catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ success: false, error: 'Failed to create job post' });
      }
}



async function getPartTimeJobs(req, res) {
        try {
            const userId = req.query.userId;
            if (!userId) {
                return res.status(400).send("Missing userId in query parameters");
            }
    
            const jobsCollection = collection(db, "Jobs");
    
            // Initialize query with full-time job type constraint
            let constraints = [where("employmentType", "==", "part-time"),orderBy("posted_at", "desc")];
    
            // Loop through query parameters and add constraints
            for (const [key, value] of Object.entries(req.query)) {
                if (key !== "employmentType" && key !== "userId") { // Ensure we don't overwrite the job_type and userId constraint
                    constraints.push(where(key, "==", value));
                }
            }
    
            // Build the final query with the constraints
            const fullTimeQuery = query(jobsCollection, ...constraints);
            const jobsSnapshot = await getDocs(fullTimeQuery);
    
            const allJobs = jobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            // Retrieve Job IDs the user has applied for
            const applicationsRef = collection(db, "Applications");
            const appliedJobsQuery = query(applicationsRef, where("studentInfo.uid", "==", userId));
            const appliedJobsSnapshot = await getDocs(appliedJobsQuery);
            const appliedJobIds = new Set(appliedJobsSnapshot.docs.map(doc => doc.data().jobId));
    
            // Filter out applied jobs from all jobs
            const unappliedJobs = allJobs.filter(job => !appliedJobIds.has(job.id));
    
            res.status(200).json(unappliedJobs);
        } catch (error) {
            console.log(error);
            res.status(500).send("Error retrieving full-time jobs");
        }
}



module.exports = {getFullTimeJobs, getPartTimeJobs, createNewJobPost, getJobsByRecruiterUid}
