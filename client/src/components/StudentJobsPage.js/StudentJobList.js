import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './StudentJobCard';
import JobDetails from './StudentJobDetails';
import './StudentJobList.css';
import Cookies from 'js-cookie';

const StudentJobList = ({ jobType }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const handleJobClick = (job) => {
    setSelectedJob(job);
  };
  useEffect(() => {
    const fetchJobs = async () => {
      const studentCookie = JSON.parse(Cookies.get('student'));

      try {
        const response = await axios.get(`http://localhost:3001/api/jobs/${jobType === 'part-time' ? 'parttimejobs' : 'fulltimejobs'}/?userId=${studentCookie.uid}`);
        console.log(response);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [jobType]);
  console.log(jobs);
  return (
    <div className="job-list-container">
      <div className="job-list-sidebar">
        {jobs.map((job) => (
          <JobCard 
          key={job.id} 
          job={job} 
          onClick={handleJobClick} 
          isSelected={selectedJob && selectedJob.id === job.id} 
        />
        ))}
      </div>
      <div className="job-details">
        <JobDetails job={selectedJob} />
      </div>
    </div>
  );
};

export default StudentJobList;
