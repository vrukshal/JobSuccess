import React from 'react';
import './css/JobPost.css';

// Helper function to format the salary with $ and commas
const formatSalary = (salary) => {
  return `$${salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

// Helper function to calculate the number of days since the job was posted
const daysSincePosted = (postedAt) => {
    const postedDate = new Date(postedAt.seconds * 1000 + postedAt.nanoseconds / 1000000);
    const today = new Date();
    const timeDifference = today - postedDate;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};

const JobPost = ({ job }) => {
    const handleClick = () => {
        window.open(job.link, '_blank', 'noopener,noreferrer');
    };
    
  return (
    
    <div className="job-post" onClick={handleClick}>
      <div className="job-post-header">
        <img src={job.companyLogo} alt={`${job.Company} logo`} className="company-logo" />
        <div className="job-info">
          <h2 className="company-name">{job.Company}</h2>
          <h3 className="job-title">{job.title}</h3>
          <p className="job-location">
            {job.location} • {daysSincePosted(job.posted_at)} days ago
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
