import React from 'react'
import './css/SidebarIcon.css';
function SidebarIcon(props) {
  return (
    <div>
      <div className='sidebar-item'><div className='icon-sidebar'><props.icon /></div>{props.text}</div>
    </div>
  )
}

export default SidebarIcon
