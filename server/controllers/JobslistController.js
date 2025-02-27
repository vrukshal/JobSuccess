const { db } = require('../config/firebase');
const { collection, getDocs, getDoc, query, where, addDoc, orderBy, doc, deleteDoc } = require('firebase/firestore');

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

async function getJobDetails(req, res) {
    try {
        const documentRef = doc(db, "Jobs", req.query.jobId);
        const docSnapshot = await getDoc(documentRef);

        if (docSnapshot.exists()) {
            const docData = docSnapshot.data();
            
            res.status(200).json(docData);
        } else {
            console.log("Document not found.");
            res.status(404).send("Job not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving Job Detail");
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

async function createSavedJobs(req, res){
    try {
        const { StudentID, JobID } = req.query;
        // Query to check if a document with the given StudentID and JobID already exists
        console.log('Here');
        const savedJobsRef = collection(db, "Saved");
        const q = query(savedJobsRef, where("StudentID", "==", StudentID), where("JobID", "==", JobID));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            // Document with the given StudentID and JobID already exists
            return res.status(409).json({ success: false, error: 'Job already saved by this student' });
        }


        const jobData = req.query;
        // console.log(jobData);
        jobData.Time_Saved = new Date().toISOString();
        const newJobRef = collection(db, "Saved");

        await addDoc(newJobRef, jobData);
        res.status(200).json({ success: true, id: newJobRef.id, jobData: jobData });
      } catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ success: false, error: 'Failed to create job post' });
      }
}

async function getSavedJobs(req, res){
    try {
        const studentID = req.query.StudentID;
        const savedJobTypeFilter = req.query.savedJobType ? req.query.savedJobType.split(',') : [];
        
        const savedJobsQuery = query(collection(db, "Saved"), where("StudentID", "==", studentID));
        const savedJobsSnapshot = await getDocs(savedJobsQuery);
        const savedJobsList = savedJobsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const jobsCollection = collection(db, "Jobs");
        
        // Fetch job details for each saved job
        const jobDetailsPromises = savedJobsList.map(async (savedJob) => {
            const jobDoc = await getDoc(doc(jobsCollection, savedJob.JobID));
            if (jobDoc.exists()) {
                return {
                    ...savedJob,
                    jobDetails: jobDoc.data()
                };
            } else {
                return {
                    ...savedJob,
                    jobDetails: null
                };
            }
        });

        const savedJobsWithDetails = await Promise.all(jobDetailsPromises);

        // res.status(200).json(savedJobsWithDetails);
        // res.status(200).json(savedJobsList);

        // Filter based on application type
        const filteredJobs = savedJobTypeFilter.length > 0 
            ? savedJobsWithDetails.filter(job => savedJobTypeFilter.includes(job.jobDetails?.jobType))
            : savedJobsWithDetails;

        res.status(200).json(filteredJobs);

      } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving Saved jobs");
      }
}

async function unsaveJob(req, res){
    try {
        const { StudentID, JobID } = req.query;
        const savedJobsRef = collection(db, "Saved");
        const q = query(savedJobsRef, where("StudentID", "==", StudentID), where("JobID", "==", JobID));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return res.status(404).json({ success: false, error: 'Saved job not found' });
        }

        // Assuming there's only one document that matches the criteria
        const docId = querySnapshot.docs[0].id;
        await deleteDoc(doc(savedJobsRef, docId));

        res.status(200).json({ success: true, message: 'Job unsaved successfully' });
    } catch (error) {
        console.error('Error unsaving job:', error);
        res.status(500).json({ success: false, error: 'Failed to unsave job' });
    }
}


module.exports = {getFullTimeJobs, getPartTimeJobs, createNewJobPost, getJobsByRecruiterUid, getJobDetails, createSavedJobs, getSavedJobs, unsaveJob}
