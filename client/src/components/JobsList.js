// JobsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/JobsList.css';

const JobsList = ({ jobType }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/jobs/${jobType === 'part-time' ? 'parttimejobs' : 'fulltimejobs'}`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [jobType]);

  return (
    <div>
      <h1>{jobType === 'part-time' ? 'Part-Time Jobs' : 'Full-Time Jobs'} Listings</h1>
      <div className="jobs-container">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Posted At:</strong> {new Date(job.posted_at.seconds * 1000).toLocaleDateString()}</p>
            <p><strong>Expires At:</strong> {new Date(job.expires_at.seconds * 1000).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsList;
