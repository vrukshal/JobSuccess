import React, { useState, useEffect } from 'react';
import './css/JobPost.css';
import axios from 'axios';

// Helper function to format the salary with $ and commas
const formatSalary = (salary) => {
  return `$${salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

// Helper function to calculate the number of days since the job was posted
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

const JobPost = ({ job }) => {
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchLogoURL = async () => {
      try {
        const { key, recruiterUid, folderName, filename } = extractUrlParts(job.recruiterInfo?.logo);
        const response = await axios.get(`http://localhost:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiterUid}`);
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

  const handleClick = () => {
    window.open(job.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="job-post" onClick={handleClick}>
      <div className="job-post-header">
        {logoUrl && <img src={logoUrl} alt={`${job.recruiterInfo?.company} logo`} className="company-logo" />}
        <div className="job-info">
          <h2 className="job-title">{job.jobTitle}</h2>
          <h3 className="company-name">{job.recruiterInfo?.company || job.Company}</h3>
          <p className="job-location">
            {job.location} • {daysSincePosted(job.posted_at)} ago
          </p>
          <p className="job-salary">{formatSalary(job.salary)}</p>
        </div>
      </div>
      {/* <div className="job-post-footer">
        <p className="job-description">{job.description}</p>
      </div> */}
    </div>
  );
};

export default JobPost;
