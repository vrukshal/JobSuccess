import React from 'react';

import './css/Sidebar.css';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { GrUserManager } from "react-icons/gr";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const userCookie = Cookies.get('user');
  let studentCookie = null;

  if (userCookie) {
    try {
      studentCookie = JSON.parse(userCookie);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }

  const jobsUrl = "/stu/jobs";
  const profileUrl = studentCookie ? `/stu/${studentCookie.uid}` : '/login'; // Redirect to login if studentCookie is null
  const eventsUrl = "/stu/events";
  const employersUrl = "/stu/employers";
  const NotificationsUrl = "/stu/notifications";
  function NavigateToURL(url) {
    console.log(url);
    navigate(url);
  }

  return (
    <div className="student-sidebar">
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
        onClick={() => NavigateToURL(NotificationsUrl)}
      >
        <NotificationsIcon />
        <text>Notification</text>
      </div>
    </div>
  );
};

export default Sidebar;
