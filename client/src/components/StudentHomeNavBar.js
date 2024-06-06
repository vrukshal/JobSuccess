// Navbar.js
import React from 'react';
import './css/StudentHomeNavBar.css';

const Navbar = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="navbar">
      <h1> Jobs </h1>
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
    </div>
  );
};

export default Navbar;
