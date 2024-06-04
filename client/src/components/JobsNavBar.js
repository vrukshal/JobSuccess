// Navbar.js
import React from 'react';
import "./css/JobsNavBar.css"

const Navbar = ({ selectedTab, setSelectedTab }) => {
  return (
    <nav className="navbar">
      <div className="navbar-options">
        <button
          className={selectedTab === 'jobs' ? 'active' : ''}
          onClick={() => setSelectedTab('jobs')}
        >
          Jobs
        </button>
        <button
          className={selectedTab === 'saved' ? 'active' : ''}
          onClick={() => setSelectedTab('saved')}
        >
          Saved
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
