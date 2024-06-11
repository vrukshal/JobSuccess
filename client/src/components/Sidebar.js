import React from 'react';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InboxIcon from '@mui/icons-material/Inbox';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import './css/Sidebar.css';
import SidebarIcon from './SidebarIcon';

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
