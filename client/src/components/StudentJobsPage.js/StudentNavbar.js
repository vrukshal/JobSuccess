// src/components/StudentNavbar.js
import React from 'react';
import './StudentNavbar.css';
import { Avatar } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Cookies from 'js-cookie';
import { auth } from '../../config/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const StudentNavbar = () => {
    const navigate = useNavigate();
    const handleProfileClick = () => {
        document.getElementById('profileDropdown').classList.toggle('show');
    };
    const logoutUser = async () => {
        console.log("Logging out ");
        await signOut(auth)
            .then(() => {
                console.log("User signed out");
                Cookies.remove('user');
                Cookies.remove('recruiter');
                Cookies.remove('student');
                navigate('/login');
            })
            .catch((err) => console.error(err));
    };
    
    const userCookie = JSON.parse(Cookies.get('student')? Cookies.get('student'): null);
    return (
  <nav className="student-navbar">
    <div className="navbar-left">
      <div className="navbar-brand">Jobs</div>
      <div className="navbar-links">
        <a href="/search">Search</a>
        <a href="/saved">Saved</a>
      </div>
    </div>
    <div className="navbar-icons">
            <div className="notification-icon"><div className='icon-container'><NotificationsActiveIcon fontSize='large' style={{ color: 'black' }} /></div></div>
            <div className="profile-icon" onClick={handleProfileClick}><div className='icon-container'><Avatar src={userCookie?.picture} fontSize='large' style={{ color: 'white' }}> {userCookie?.email[0].toUpperCase()}</Avatar></div></div>
            <div id="profileDropdown" className="dropdown-content">
                <a href="#notification-preferences">Notification Preferences</a>
                <a href="#settings">Settings</a>
                <a href="#help">Help</a>
                <a href="#terms-of-service">Terms of Service</a>
                <a onClick={logoutUser}>Logout</a>
            </div>
        </div>
  </nav>
)};

export default StudentNavbar;
