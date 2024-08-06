import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import StudentNavbar from '../StudentJobsPage.js/StudentNavbar';
import Sidebar from '../Sidebar';

const JobDetailsPage = () => {
    const location = useLocation();
    const { savedJob } = location.state || {};
    console.log(savedJob);
    if (!savedJob) {
        return <div>No job details available.</div>;
    }

    // const { jobId } = useParams();
    // console.log(jobId);
    // const [jobDetails, setJobDetails] = useState(null);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchJobDetails = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:3001/api/jobs/getJobdetails?jobId=${jobId}`);
    //             console.log("Good");
    //             console.log(response.data);
    //             setJobDetails(response.data);
    //         } catch (error) {
    //             console.error('Error fetching job details:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchJobDetails();
    // }, [jobId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (!jobDetails) {
    //     return <div>No job details found.</div>;
    // }

    return (
        <div className="saved-jobs-page-container">
            <Sidebar />
            <div className="saved-jobs-page">
                <StudentNavbar />
            <div>
                <h1>{savedJob.jobDetails?.jobTitle}</h1>
                <p>{savedJob.jobDetails?.jobDescription}</p>
                <p><strong>Company:</strong> {savedJob.jobDetails?.recruiterInfo.company}</p>
                <p><strong>Location:</strong> {savedJob.jobDetails?.location}</p>
                <p><strong>Employment Type:</strong> {savedJob.jobDetails?.employmentType}</p>
                <p><strong>Duration:</strong> {savedJob.jobDetails?.duration}</p>
                {/* <a href={jobDetails.applylink} target="_blank" rel="noopener noreferrer">Apply Here</a> */}
            </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
