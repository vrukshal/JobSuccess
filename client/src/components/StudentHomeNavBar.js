import React from 'react';
import "./css/StudentHomeNavBar.css";

const StudentNavbar = ({ selectedTab, setSelectedTab }) => {
  return (
    <nav className="student-navbar">
      <div className="student-navbar-inner">
        <h1 className="student-navbar-title">Jobs</h1>
        <div className="student-navbar-options">
          <button
            className={selectedTab === 'jobs' ? 'student-active' : ''}
            onClick={() => setSelectedTab('jobs')}
          >
            Jobs
          </button>
          <button
            className={selectedTab === 'saved' ? 'student-active' : ''}
            onClick={() => setSelectedTab('saved')}
          >
            Saved
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
