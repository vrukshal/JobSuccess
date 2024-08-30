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

  const getApplicants = async (jobId) => {
    console.log("Finding number of applicants...");
    const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/application?jobId=${jobId}`);
    return response.data.count;
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/jobs?recruiterUid=${recruiterCookie.uid}`);
        const jobsWithApplicants = await Promise.all(
          response.data.map(async (job) => {
            const applicantsCount = await getApplicants(job.id);
            return {
              id: job.id,
              job: job.jobTitle,
              applicants: applicantsCount,
              schools: 1, // Default value for schools
              created: new Date(job.posted_at).toLocaleDateString(),
              type: job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1),
              status: 'Active' // Default status as 'Active', modify based on your logic
            };
          })
        );
        setJobs(jobsWithApplicants);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [recruiterCookie.uid]);

  const filteredJobs = jobs.filter(job =>
    (activeTab === 'All' || job.status === activeTab) &&
    job.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function redirectToApplicants(job) {
    navigate(`/rec/postings/${job.id}`)
  }

  return (
    <div className="main-containter-to-fit-in-centre">
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
        <table className="table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
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
                {/* <td>{job.id}</td> */}
                <td onClick={() => redirectToApplicants(job)}>{job.job}</td>
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
    </div>
  );
};

export default JobPosts;
