// src/components/StudentNavbar.js
import React, { useRef } from 'react';
import './StudentNavbar.css';
import { Avatar } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Cookies from 'js-cookie';
import { auth } from '../../config/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const StudentNavbar = () => {
    const profileIconRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleProfileClick = () => {        
        const dropdown = dropdownRef.current;
        const profileIcon = profileIconRef.current;

        const rect = profileIcon.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.style.left = `${rect.left-150}px`;
        dropdown.classList.toggle('show');
        // document.getElementById('profileDropdown').classList.toggle('show');
    };
    const logoutUser = async () => {
        console.log("Logging out ");
        await signOut(auth)
            .then(() => {
                console.log("User signed out");
                Cookies.remove('user');
                Cookies.remove('recruiter');
                Cookies.remove('student');
                localStorage.removeItem('appliedJobs');
                navigate('/login');
            })
            .catch((err) => console.error(err));
    };
    const changePage = (page) => {
        navigate(`/stu/jobs/${page}`);
    };
    
    const userCookie = JSON.parse(Cookies.get('student')? Cookies.get('student'): null);

    const displayCharacter = userCookie?.email ? userCookie.email[0].toUpperCase() : 'R';

    console.log(userCookie);
    return (
  <nav className="student-navbar">
    <div className="navbar-left">
      <div className="navbar-brand"><p>Jobs</p></div>
      <div className="navbar-links">
      <button onClick={() => changePage('applied')}>Applied</button>
      <button onClick={ () => changePage('saved')}>Saved</button>
       
      </div>
    </div>
    <div className="student-navbar-icons">
        <div className="student-notification-icon"><div className='student-icon-container'><NotificationsActiveIcon fontSize='large' style={{ color: 'black' }} /></div></div>
        <div className="student-profile-icon" onClick={handleProfileClick} ref={profileIconRef}><div className='student-icon-container'><Avatar src={userCookie?.picture} fontSize='large' style={{ color: 'white' }}> {displayCharacter}</Avatar></div></div>
        <div id="profileDropdown" className="student-dropdown-content" ref={dropdownRef}>
            <a href="#notification-preferences">Notification Preferences</a>
            <a href="#settings">Settings</a>
            <a href="#help">Help</a>
            <a href="#terms-of-service">Terms of Service</a>
            <a href="#logout" onClick={logoutUser}>Logout</a>
        </div>
    </div>
  </nav>
)};

export default StudentNavbar;
