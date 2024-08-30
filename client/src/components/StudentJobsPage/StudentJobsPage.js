// src/pages/JobsPage.js
import React, { useState } from 'react';
import StudentNavbar from './StudentNavbar';
import StudentJobList from './StudentJobList';
import './StudentJobsPage.css';
import Sidebar from '../Sidebar';
import { IoIosSearch } from "react-icons/io";


const StudentJobsPage = () => {
  const [jobType, setJobType] = useState('full-time');
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="student-page-container">
        <Sidebar />
        <div className='student-main-section-page'>
            <StudentNavbar />
            
            <div className="jobs-search-filter">
                {/* <input type="text" placeholder="Search jobs" /> */}
                <div className="search-bar">
                    <input 
                    type="text" 
                    placeholder="Search jobs" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    <button type="submit">
                        < IoIosSearch size={30} style={{ color: "black" }}/>
                    </button>
                </div>
                <button onClick={() => setJobType('full-time')}>Full-time</button>
                <button onClick={() => setJobType('part-time')}>Part-time</button>
                <button onClick={() => setJobType('internship')}>Internship</button>
                <button onClick={() => setJobType('remote')}>Remote</button>
            </div>
            <StudentJobList jobType={jobType} />
        </div>
    </div>
  );
};

export default StudentJobsPage;
