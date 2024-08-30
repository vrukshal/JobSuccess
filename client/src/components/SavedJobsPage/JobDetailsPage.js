import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StudentNavbar from '../StudentJobsPage/StudentNavbar';
import Sidebar from '../Sidebar';
import './JobDetailsPage.css';

const JobDetailsPage = () => {
    const location = useLocation();
    const { application, savedJob } = location.state || {};

    // Logging for debugging purposes
    if (savedJob) {
        console.log("Inside Saved Job Page:");
        console.log(savedJob);
    } else if (application) {
        console.log("Inside Applied Jobs Page:");
        console.log(application);
    } else {
        return <div>No job details available.</div>;
    }

    return (
        <div className="student-page-container">
            <Sidebar />
            <div className="student-main-section-page">
                <StudentNavbar />
                <div className="main-container-to-fit-in-centre">
                    {savedJob ? (
                        <div className="job-details-for-selected-job">
                            <h1>{savedJob.jobDetails?.jobTitle}</h1>
                            <p>{savedJob.jobDetails?.jobDescription}</p>
                            <p><strong>Company:</strong> {savedJob.jobDetails?.recruiterInfo.company}</p>
                            <p><strong>Location:</strong> {savedJob.jobDetails?.location}</p>
                            <p><strong>Employment Type:</strong> {savedJob.jobDetails?.employmentType}</p>
                            <p><strong>Duration:</strong> {savedJob.jobDetails?.duration}</p>
                        </div>
                    ) : application ? (
                        <div className="job-details-for-selected-job">
                            <h1>{application.recruiterInfo?.jobTitle}</h1>
                            <p>{application.jobDetails?.jobDescription}</p>
                            <p><strong>Company:</strong> {application.jobDetails?.recruiterInfo.company}</p>
                            <p><strong>Location:</strong> {application.jobDetails?.location}</p>
                            <p><strong>Employment Type:</strong> {application.jobDetails?.employmentType}</p>
                            <p><strong>Duration:</strong> {application.jobDetails?.duration}</p>
                            <p><strong>Status:</strong> {application.status}</p>
                        </div>
                    ) : (
                        <div>No job details available.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
