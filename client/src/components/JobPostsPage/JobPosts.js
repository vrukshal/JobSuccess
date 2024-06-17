import React, { useState } from 'react';
import './JobPosts.css';
import { IoPerson } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const JobPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();
  const jobs = [
    { id: 667, job: 'Cupcake Counter', applicants: 2, schools: 1, created: '10/25/2017', type: 'Job', status: 'Active' },
    { id: 1674, job: 'Cupcake Decorator', applicants: 1, schools: 1, created: '9/4/2018', type: 'Job', status: 'Active' },
    { id: 753, job: 'Cupcake Decorator', applicants: 2, schools: 1, created: '11/14/2017', type: 'Job', status: 'Expired' },
    { id: 1520, job: 'Cupcake Decorator', applicants: 0, schools: 5, created: '4/27/2018', type: 'Job', status: 'Declined' },
    { id: 1700, job: 'Winter Internship', applicants: 5, schools: 1, created: '9/24/2018', type: 'Internship', status: 'Not Posted' },
  ];

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
