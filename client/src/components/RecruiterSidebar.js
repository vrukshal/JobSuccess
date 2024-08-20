import React from 'react';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InboxIcon from '@mui/icons-material/Inbox';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import './css/RecruiterSidebar.css';
import SidebarIcon from './SidebarIcon';

const RecruiterSidebar = () => {
  return (
    <div className="recruiter-sidebar">
      <div className="recruiter-sidebar-items">
        <SidebarIcon icon={EventNoteRoundedIcon} text="Events"/>
        <SidebarIcon icon={LocalLibraryIcon} text="Students"/>
        <SidebarIcon icon={InboxIcon} text="Inbox"/>
        <SidebarIcon icon={BusinessCenterIcon} text="Career Center"/>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
