import React from 'react';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InboxIcon from '@mui/icons-material/Inbox';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import './css/RecruiterSidebar.css';
import SidebarIcon from './SidebarIcon';

const RecruiterSidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <SidebarIcon icon={EventNoteRoundedIcon} text="Events"/>
        <SidebarIcon icon={LocalLibraryIcon} text="Students"/>
        <SidebarIcon icon={InboxIcon} text="Inbox"/>
        <SidebarIcon icon={BusinessCenterIcon} text="Career Center"/>
        {/* <li><div className='li-item'>Events <EventNoteRoundedIcon /></div></li> */}
        {/* <li>Students <LocalLibraryIcon /></li>
        <li>Inbox <InboxIcon /></li>
        <li>Career Center <BusinessCenterIcon /></li> */}
      </ul>
    </div>
  );
};

export default RecruiterSidebar;
