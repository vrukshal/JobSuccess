// Sidebar.js
import React from 'react';
import './css/Sidebar.css';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="sidebar">
      <button
        className={currentPage === 'Jobs' ? 'active' : ''}
        onClick={() => setCurrentPage('Jobs')}
      >
        Jobs
      </button>
      <button
        className={currentPage === 'Events' ? 'active' : ''}
        onClick={() => setCurrentPage('Events')}
      >
        Events
      </button>

      <button
        className={currentPage === 'Employers' ? 'active' : ''}
        onClick={() => setCurrentPage('Employers')}
      >
        Employers
      </button>

      <button
        className={currentPage === 'Notifications' ? 'active' : ''}
        onClick={() => setCurrentPage('Notifications')}
      >
        Notifications
      </button>
    </div>
  );
};

export default Sidebar;
