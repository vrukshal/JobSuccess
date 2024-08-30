import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './StudentJobCard';
import JobDetails from './StudentJobDetails';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import './StudentJobList.css';
import Cookies from 'js-cookie';

const StudentJobList = ({ jobType }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  // const [savedJobs, setSavedJobs] = useState(() => {
  //   const storedSavedJobs = localStorage.getItem('savedJobs');
  //   return storedSavedJobs ? JSON.parse(storedSavedJobs) : [];
  // });

  
  useEffect(() => {
    const fetchJobs = async () => {
      const studentCookie = JSON.parse(Cookies.get('student'));

      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/jobs/${jobType === 'part-time' ? 'parttimejobs' : 'fulltimejobs'}/?userId=${studentCookie.uid}`);
        console.log(response);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [jobType]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const studentCookie = JSON.parse(Cookies.get('student'));
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/jobs/getSavedJobs?StudentID=${studentCookie.uid}`);
        const savedJobIds = response.data.map(job => job.JobID);
        console.log("Good Nice:"+savedJobIds);
        setSavedJobs(savedJobIds);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobIds));
      } catch (error) {
        console.error('Error fetching saved jobs:', error);
      }
    };

    fetchSavedJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    // console.log('Check whether True or False: '+savedJobs.includes(job.id)+"   See Job ID :"+job.id);
    setIsSaved(savedJobs.includes(job.id));
  };

  return (
    <div className="job-list-container">
      <div className="job-list-sidebar">
        {jobs.map((job) => (
          <JobCard 
          key={job.id} 
          job={job} 
          onClick={() => handleJobClick(job)} 
          isSelected={selectedJob && selectedJob.id === job.id} 
        />
        ))}
      </div>
      {/* Here the parameter isSaved is passed because we have to display 
      the Saved button even if the cookies are removed and Student has log 
      out and when we login again the button was not updated. So here we 
      are checking from the databse firstly whether that Specific Job is saved or not*/}
      <div className="job-details">
        <JobDetails 
          job={selectedJob}
          isSaved={isSaved}
          // savedJobs={savedJobs}
         />
      </div>
    </div>
  );
};

export default StudentJobList;
