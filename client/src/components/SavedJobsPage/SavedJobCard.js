import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SavedJobCard.css';
import JobDetails from '../StudentJobsPage.js/StudentJobDetails';
import axios from 'axios';

const daysSincePosted = (postedAt) => {
    const posted = new Date(postedAt);
    const now = new Date();
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return formatDays(diffDays);
};

const formatDays = (days) => {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    let result = "";
    if (years > 0) {
        result += `${years} year${years > 1 ? 's' : ''} `;
    }
    if (months > 0) {
        result += `${months} month${months > 1 ? 's' : ''} `;
    }
    if (remainingDays > 0 || result === "") {
        result += `${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    }
    return result.trim();
};

const extractUrlParts = (url) => {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const parts = pathname.split('/').filter(Boolean);

    if (parts.length < 3) {
        throw new Error('Invalid URL format');
    }

    const recruiterUid = parts[0];
    const folderName = parts[1];
    const filename = parts.slice(2).join('/');

    return {
        key: parts.slice(1).join('/'),
        recruiterUid,
        folderName,
        filename,
    };
};

const JobCard = ({ savedJob }) => {

    // console.log('Received savedJob:', savedJob);  // Log the received savedJob
    const navigate = useNavigate();
    const [logoUrl, setLogoUrl] = useState('');
    const [jobTitle, SetJobTitle]   = useState('');
    
    const jobId = savedJob.JobID;
    useEffect(() => {
        const fetchLogoURL = async () => {
            try {
                const {  recruiterUid, folderName, filename } = extractUrlParts(savedJob.jobDetails?.recruiterInfo?.logo);
                // console.log('Recruiter '+recruiterUid);
                const response = await axios.get(`http://localhost:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiterUid}`);
                const { downloadUrl } = response.data;
                setLogoUrl(downloadUrl);
                
                // const JobResponse = await axios.get(`http://localhost:3001/api/jobs/getJobdetails?jobId=${jobId}`);
                // console.log("Hello");
                // console.log(savedJob.jobDetails?.jobTitle);
                SetJobTitle(savedJob.jobDetails?.jobTitle);

            } catch (error) {
                console.error('Error fetching image URL or JobDetails:', error);
            }
        };


        if (savedJob.jobDetails?.recruiterInfo?.logo) {
            fetchLogoURL();
        }
    }, [savedJob.jobDetails?.recruiterInfo?.logo,jobId]);


    const handleClick = () => {
        navigate(`/stu/job-details/${savedJob.JobID}`, { state: { savedJob } });
    };
    // console.log('savedJob.jobDetails?.jobID:', savedJob.JobID);

    return (
        <div className="saved-job-card" onClick={handleClick}>
            <div className="saved-company-logo">
                {logoUrl && <img src={logoUrl} alt={`${savedJob.jobDetails?.recruiterInfo?.company} logo`} />}
            </div>
            <div className="saved-job-details">
                <p className="saved-company-name">{savedJob.jobDetails?.recruiterInfo?.company}</p>
               
                <h4 className="saved-job-title ">{savedJob.jobDetails?.jobTitle}</h4>
                {/* <Link to={{ pathname: `/stu/job-details/${savedJob.JobID}`, state: { savedJob } }}>
                    <h4 className="saved-job-title">{jobTitle}</h4>
                </Link> */}
                {/* <p className="applied-time">{daysSincePosted(savedJob.appliedAt)} ago</p> */}
            </div>
        </div>
    );
};

export default JobCard;
