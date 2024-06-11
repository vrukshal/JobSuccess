import React from 'react';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReviewsIcon from '@mui/icons-material/Reviews';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import {Avatar} from "@mui/material"
import './css/RecruiterNavbar.css';
import RecruiterNavbarOption from './RecruiterNavbarOption';
import { useSelector } from 'react-redux';

const RecruiterNavbar = () => {
    const user = useSelector((state) => state.auth.user);
    console.log("RecruiterNavbar",user);
    const handleProfileClick = () => {
    document.getElementById('profileDropdown').classList.toggle('show');
  };

  console.log(user);
  const profileURL = "/rec/"+user.uid;
  console.log(profileURL);

  return (
    <div className="navbar">
      <ul>
        <RecruiterNavbarOption icon={AccountBoxIcon} text='Profile' onClickUrl={profileURL}/>
        <RecruiterNavbarOption icon={WorkIcon} text='Job Posts'/>
        <RecruiterNavbarOption icon={GroupsIcon} text='Meetings'/>
        <RecruiterNavbarOption icon={InventoryIcon} text='Documents'/>
        <RecruiterNavbarOption icon={ReviewsIcon} text='Reviews'/>

        {/* <li><div className='navbar-option'><div className='icon-container'><AccountBoxIcon fontSize='large'/></div> Profile</div></li>
        <li><WorkIcon fontSize='large'/> Job Posts</li>
        <li><GroupsIcon fontSize='large'/> Meetings</li>
        <li><InventoryIcon fontSize='large'/>Documents</li>
        <li><ReviewsIcon fontSize='large'/> Reviews</li> */}
      </ul>
      <div className="navbar-icons">
        <div className="notification-icon"><div className='icon-container'><NotificationsActiveIcon fontSize='large' style={{ color: 'white' }}/></div></div>
        <div className="profile-icon" onClick={handleProfileClick}><div className='icon-container'><PersonIcon fontSize='large' style={{ color: 'white' }}/></div></div>
        <div id="profileDropdown" className="dropdown-content">
          <a href="#notification-preferences">Notification Preferences</a>
          <a href="#settings">Settings</a>
          <a href="#help">Help</a>
          <a href="#terms-of-service">Terms of Service</a>
          <a href="#logout">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default RecruiterNavbar;
