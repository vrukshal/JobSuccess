import React, { useRef } from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReviewsIcon from '@mui/icons-material/Reviews';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar } from "@mui/material";
import './css/RecruiterNavbar.css';
import RecruiterNavbarOption from './RecruiterNavbarOption';
import Cookies from 'js-cookie';
import { auth } from '../config/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const RecruiterNavbar = () => {
    const navigate = useNavigate();
    const profileIconRef = useRef(null);
    const dropdownRef = useRef(null);

    const recruiterCookie = JSON.parse(Cookies.get('recruiter'));
    const userCookie = JSON.parse(Cookies.get('user'));
    // console.log("USER:",userCookie.email);
    const handleProfileClick = () => {        
        const dropdown = dropdownRef.current;
        const profileIcon = profileIconRef.current;

        const rect = profileIcon.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.style.left = `${rect.left-150}px`;
        dropdown.classList.toggle('show');
        // document.getElementById('profileDropdown').classList.toggle('show');
    };

    const profileURL = "/rec/" + recruiterCookie.uid;
    const docURL = "/rec/files";
    const jobPostingsURL = "/rec/postings";
    console.log(userCookie.picture);

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

    return (
        <div className="recruiter-navbar"> 
            <div className="recruiter-navbar-left">
                <ul>
                    <RecruiterNavbarOption icon={AccountBoxIcon} text='Profile' onClickUrl={profileURL} />
                    <RecruiterNavbarOption icon={WorkIcon} text='Job Posts' onClickUrl={jobPostingsURL} />
                    <RecruiterNavbarOption icon={GroupsIcon} text='Meetings' />
                    <RecruiterNavbarOption icon={InventoryIcon} text='Documents' onClickUrl={docURL} />
                    <RecruiterNavbarOption icon={ReviewsIcon} text='Reviews' />
                </ul>
            </div>
            <div className="recruiter-navbar-icons">
                <div className="recruiter-notification-icon"><div className='recruiter-icon-container'><NotificationsActiveIcon fontSize='large' style={{ color: 'white' }} /></div></div>
                <div className="recruiter-profile-icon" onClick={handleProfileClick} ref={profileIconRef}><div className='recruiter-icon-container'><Avatar src={userCookie.picture} fontSize='large' style={{ color: 'white' }}> {userCookie?.email[0].toUpperCase()}</Avatar></div></div>
                <div id="profileDropdown" className="recruiter-dropdown-content" ref={dropdownRef}>
                    <a href="#notification-preferences">Notification Preferences</a>
                    <a href="#settings">Settings</a>
                    <a href="#help">Help</a>
                    <a href="#terms-of-service">Terms of Service</a>
                    <a onClick={logoutUser}>Logout</a>
                </div>
            </div>
        </div>
    );
};

export default RecruiterNavbar;
