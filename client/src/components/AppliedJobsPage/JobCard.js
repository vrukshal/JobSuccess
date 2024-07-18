import React, { useEffect, useState } from 'react';
import './JobCard.css';
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

const JobCard = ({ application }) => {

    const [logoUrl, setLogoUrl] = useState('');
    const [jobTitle, SetJobTitle]   = useState('');
    
    const jobId = application.jobId;
    useEffect(() => {
        const fetchLogoURL = async () => {
            try {
                const {  recruiterUid, folderName, filename } = extractUrlParts(application.recruiterInfo?.logo);
                const response = await axios.get(`http://localhost:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiterUid}`);
                const { downloadUrl } = response.data;
                setLogoUrl(downloadUrl);
                
                const JobResponse = await axios.get(`http://localhost:3001/api/jobs/getJobdetails?jobId=${jobId}`);
                SetJobTitle(JobResponse.data.jobTitle);

            } catch (error) {
                console.error('Error fetching image URL or JobDetails:', error);
            }
        };


        if (application.recruiterInfo?.logo) {
            fetchLogoURL();
        }
    }, [application.recruiterInfo?.logo,jobId]);

    return (
        <div className="applied-job-card">
            <div className="company-logo">
                {logoUrl && <img src={logoUrl} alt={`${application.recruiterInfo?.company} logo`} />}
            </div>
            <div className="applied-job-details">
                <p className="company-name">{application.recruiterInfo?.company}</p>
               
                <h4 className="applied-job-title ">{jobTitle}</h4>
                <p className="applied-time">{daysSincePosted(application.appliedAt)} ago</p>
            </div>
            <div className="job-status">
                <p>{application.hasOwnProperty("status")? application.status : "Pending" }</p>
            </div>
        </div>
    );
};

export default JobCard;
