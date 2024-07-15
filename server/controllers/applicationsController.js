const dotenv = require('dotenv');
dotenv.config();
const { auth, db } = require('../config/firebase');
const { collection, addDoc, getDocs, query, where,orderBy } = require('firebase/firestore');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { useDispatch, useSelector } = require('react-redux');
const { admin } = require('../config/firebase-admin');

async function createApplication(req, res){
    try {
        const applicationData = {
            jobId: req.body.jobId,
            recruiterInfo: req.body.recruiterInfo,
            studentInfo: req.body.studentInfo,
            appliedAt: new Date().toISOString(),
            resumeUrl: req.body.resumeUrl,
            status : 'Pending'
        }
        console.log(applicationData);
        const applicationsRef = collection(db, "Applications");
        await addDoc(applicationsRef, applicationData);
        res.status(200).json({ success: true, id: applicationsRef.id, applicationData: applicationData });
      } catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ success: false, error: 'Failed to create job post' });
      }
}

async function getApplicants(req, res){
    try {
        const applicationsCollection = collection(db, "Applications");

        let constraints = [];

        for (const [key, value] of Object.entries(req.query)) {
            if (key === "studentUid") {
                constraints.push(where("studentInfo.uid", "==", value),orderBy("appliedAt", "desc"));
            } else {
                constraints.push(where(key, "==", value));
            }
        }

        const applicationsQuery = query(applicationsCollection, ...constraints);
        const applicationsSnapshot = await getDocs(applicationsQuery);
        const listOfApplicants = applicationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const applicationsList = {
            count: applicationsSnapshot.size,
            data: listOfApplicants
        };

        res.status(200).json(applicationsList);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving full-time jobs");
    }
}
module.exports = { createApplication, getApplicants }