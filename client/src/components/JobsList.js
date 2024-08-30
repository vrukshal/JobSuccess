// JobsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/JobsList.css';
import JobPost from './JobPost';

const JobsList = ({ jobType }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/jobs/${jobType === 'part-time' ? 'parttimejobs' : 'fulltimejobs'}`);
        
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [jobType]);

  return (
    <div>
      {jobs.length > 0 ? (
        <div className="job-list">
          {jobs.map((job) => (
            <JobPost key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p>No jobs available</p>
      )}
    </div>
  );
};

export default JobsList;
