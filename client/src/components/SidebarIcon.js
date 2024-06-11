import React from 'react'
import './css/SidebarIcon.css';
function SidebarIcon(props) {
  return (
    <div>
      <li><div className='sidebar-item'><div className='icon-sidebar'><props.icon /></div>{props.text}</div></li>
    </div>
  )
}

export default SidebarIcon
