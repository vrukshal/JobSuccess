import React, { useState, useEffect } from 'react';
import './JobPosts.css';
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const JobPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const recruiterCookie = JSON.parse(Cookies.get('recruiter'));
  useEffect(() => {
    axios.get(`http://localhost:3001/api/jobs?recruiterUid=${recruiterCookie.uid}`)
      .then(response => {
        const fetchedJobs = response.data.map(job => ({
          id: job.id,
          job: job.jobTitle,
          applicants: job.recruiterInfo.files?.length, // Assuming the number of files is the number of applicants
          schools: 1, // This information is not available in the API response, setting a default value
          created: new Date(job.posted_at).toLocaleDateString(),
          type: job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1),
          status: 'Active' // Default status as 'Active', modify based on your logic
        }));
        setJobs(fetchedJobs);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
      console.log(jobs);
  }, []);

  const filteredJobs = jobs.filter(job =>
    (activeTab === 'All' || job.status === activeTab) &&
    job.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-posts-container">
      <div className="job-posts-header">
        <h1>Jobs</h1>
        <div className='jobposts-search-bar'>
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
          <button className="btn btn-primary">Search</button>
          <button className="btn btn-success" onClick={() => navigate('/rec/postings/newjobpost')}>Create Job</button>
        </div>
      </div>
      <div className="tabs">
        {['Active', 'Expired', 'All', 'Declined', 'Not Posted'].map(tab => (
          <button
            key={tab}
            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Job</th>
            <th>Applicants</th>
            <th>Schools</th>
            <th>Created</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.job}</td>
              <td><IoPerson /> {job.applicants}</td>
              <td>{job.schools}</td>
              <td>{job.created}</td>
              <td>{job.type}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobPosts;
