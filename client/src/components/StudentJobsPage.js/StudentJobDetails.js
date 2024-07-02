import React from 'react';
import './StudentJobDetails.css';

const StudentJobDetails = ({ job }) => (
  <div className="job-details-content">
    {job ? (
      <>
        <h2>{job.jobTitle}</h2>
        <p><strong>Company:</strong> {job.recruiterInfo?.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Type:</strong> {job.jobType}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p>{job.jobDescription}</p>
      </>
    ) : (
      <p>Select a job to see the details</p>
    )}
  </div>
);

export default StudentJobDetails;
