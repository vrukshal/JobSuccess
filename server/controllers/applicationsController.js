const dotenv = require('dotenv');
dotenv.config();
const { auth, db } = require('../config/firebase');
const { collection, addDoc, getDoc, getDocs, doc, query, where, updateDoc, orderBy } = require('firebase/firestore');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { useDispatch, useSelector } = require('react-redux');
const { admin } = require('../config/firebase-admin');
const { sendMail } = require('../sendEmails/gmail');
async function createApplication(req, res) {
    try {
        const applicationData = {
            jobId: req.body.jobId,
            recruiterInfo: req.body.recruiterInfo,
            studentInfo: req.body.studentInfo,
            appliedAt: new Date().toISOString(),
            resumeUrl: req.body.resumeUrl,
            status: 'Pending',
            applicationType : "Full-time",
            score: req.body.score.length > 3? "20" : req.body.score,
            educationScore: req.body.educationScore,
            educationSuggestions: req.body.educationSuggestions,
            experienceScore: req.body.experienceScore,
            experienceSuggestions: req.body.experienceSuggestions,
            projectsScore: req.body.projectsScore,
            projectsSuggestions: req.body.projectsSuggestions,
        }
        // console.log(applicationData);
        const applicationsRef = collection(db, "Applications");
        const docRef = await addDoc(applicationsRef, applicationData);
        res.status(200).json({ success: true, id: docRef.id, applicationData: applicationData });
    } catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ success: false, error: 'Failed to create job post' });
    }
}

async function getApplicants(req, res) {
    try {
        const applicationsCollection = collection(db, "Applications");

        let constraints = [];

        for (const [key, value] of Object.entries(req.query)) {
            if (key === "studentUid") {
                constraints.push(where("studentInfo.uid", "==", value), orderBy("appliedAt", "desc"));
            } else if(value!='') {
                constraints.push(where(key, "==", value));
            }
        }



        const applicationsQuery = query(applicationsCollection, ...constraints);
        const applicationsSnapshot = await getDocs(applicationsQuery);
     
        const listOfApplicants = applicationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("retrieved application witht the constraints",listOfApplicants);
        const applicationsList = {
            count: applicationsSnapshot.size,
            data: listOfApplicants
        };

        res.status(200).json(applicationsList);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving applicants");
    }
}

async function updateApplication(req, res) {
    try {
        const { id } = req.params;
        const updates = req.body;
        const applicationRef = doc(db, "Applications", id);
        await updateDoc(applicationRef, updates);
        
        // If status is declined, return applicant info
        if (updates.status === 'Declined') {
            const applicationSnapshot = await getDoc(applicationRef);
            const applicationData = applicationSnapshot.data();
            res.status(200).json({ success: true, message: 'Application updated successfully', declinedApplicant: applicationData });
        } else {
            res.status(200).json({ success: true, message: 'Application updated successfully' });
        }
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ success: false, error: 'Failed to update application' });
    }
}

async function notifyDeclinedApplicants(req, res) {
    try {
        console.log("In notify API");
        const declinedApplicants = req.body.declinedApplicants;
        const jobId = req.body.jobId;
        const response = await fetch(`http://localhost:3001/api/jobs/getJobdetails?jobId=${jobId}`);
        const JobResponse = await response.json();
        // console.log("JOBRES",JobResponse);
        declinedApplicants.forEach(async (applicant) => {
            // Send email
            const emailMessage = `
            Hi ${applicant.studentInfo.firstName},

            Thank you for submitting your resume for consideration for the position of ${JobResponse.jobTitle} at ${JobResponse.recruiterInfo?.company}
            We are fortunate to have many qualified candidates apply to each of our positions. We have reviewed the qualifications of each candidate and, after careful consideration, we have determined that the credentials of other candidates may better fit our needs at this time.

            We will keep your information in our system and, if in the future, we have a job opening that better fits your profile we will make sure to reach out to you.

            Please accept our best wishes in your job search.

            Sincerely,
            ${JobResponse.recruiterInfo?.company} Talent Acquisition Team
            `;
            await sendEmailtoDeclinedApplicants(applicant.studentInfo?.email, 'Application Status Update', emailMessage);

            // Add notification to collection
            const notificationData = {
                studentUid: applicant.studentInfo.uid,
                message: 'Your application has been declined.',
                date: new Date().toISOString()
            };
            const notificationsRef = collection(db, "Notifications");
            await addDoc(notificationsRef, notificationData);
        });

        res.status(200).json({ success: true, message: 'Notifications sent successfully' });
    } catch (error) {
        console.error('Error notifying declined applicants:', error);
        res.status(500).json({ success: false, error: 'Failed to notify declined applicants' });
    }
}

async function sendEmailtoDeclinedApplicants(to, subject, emailMessage) {
    const options = {
        from: 'jobsuccess.noreply@gmail.com',
        to: to,
        subject: subject,
        text: emailMessage
    }
    console.log(options);
    await sendMail(options)
  .then((id) => {
    console.log('Email sent with ID:', id);
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });
    console.log(`Email sent to ${to} with subject: ${subject}`);
}

module.exports = { createApplication, getApplicants, updateApplication, notifyDeclinedApplicants };
