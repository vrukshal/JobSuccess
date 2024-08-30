import React, { useEffect, useState } from 'react';
import './StudentJobCard.css';
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
  if (remainingDays > 0 || result === "") { // Add days if no other unit is added
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
    const filename = parts.slice(2).join('/'); // In case there are subfolders
  
    return {
        key: parts.slice(1).join('/'), // Exclude the recruiterUid from the key
        recruiterUid,
        folderName,
        filename,
    };
  };
const StudentJobCard = ({ job, onClick, isSelected }) => {
    
    const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchLogoURL = async () => {
      try {
        console.log(job.recruiterInfo?.logo)
        const { key, recruiterUid, folderName, filename } = extractUrlParts(job.recruiterInfo?.logo);
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiterUid}`);
        const { downloadUrl } = response.data;
        setLogoUrl(downloadUrl);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };

    if (job.recruiterInfo?.logo) {
      fetchLogoURL();
    }
  }, [job.recruiterInfo?.logo]);
    
  return (
    // console.log(job)
    <div className={`job-card ${isSelected ? 'selected' : ''}`} onClick={() => onClick(job)}>
    <div className="job-post-header">
        {logoUrl && <img src={logoUrl} alt={`${job.recruiterInfo?.company} logo`} className="company-logo" />}
    <div className='job-post-recruiter-info'>
        <p>{job.recruiterInfo?.company}</p>
        <h4>{job.jobTitle}</h4> 
        <p>{job.location} • {daysSincePosted(job.posted_at)} ago • {job.jobType}</p>
    </div>
    </div>
  </div>
)};

export default StudentJobCard;
