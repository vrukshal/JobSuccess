import React from 'react';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InboxIcon from '@mui/icons-material/Inbox';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import './css/Sidebar.css';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { GrUserManager } from "react-icons/gr";

import SidebarIcon from './SidebarIcon';
import { useNavigate } from 'react-router-dom';

const jobsUrl = "/stu/jobs";
const profileUrl = "/stu/profile";
const eventsUrl = "/stu/events";
const employersUrl = "/stu/employers";
const Sidebar = ({ currentPage, setCurrentPage }) => {

  const navigate = useNavigate();
    function NavigateToURL(url){
        console.log(url);
        navigate(url);
    }

  return (
    <div className="sidebar">
      <div
        className={currentPage === 'Jobs' ? 'active' : ''}
        onClick={() => NavigateToURL(jobsUrl)}
      >
        <WorkIcon />
         <text>Jobs</text>
         
      </div>
      <div
        className={currentPage === 'Profile' ? 'active' : ''}
        onClick={() => NavigateToURL(profileUrl)}
      >
        <PersonIcon />
        <text>Profile</text>
        
      </div>
      <div
        className={currentPage === 'Events' ? 'active' : ''}
        onClick={() => NavigateToURL(eventsUrl)}
      >
        <EventIcon />
        <text>Events</text>
        
      </div>

      <div
        className={currentPage === 'Employers' ? 'active' : ''}
        onClick={() => NavigateToURL(employersUrl)}
      >
        <GrUserManager />
        <text>Employers</text>
      </div>

      <div
        className={currentPage === 'Notifications' ? 'active' : ''}
        onClick={() => setCurrentPage('Notifications')}
      >
        <NotificationsIcon />
        <text>Notifications</text>
        
      </div>
    </div>
  );
};

export default Sidebar;
