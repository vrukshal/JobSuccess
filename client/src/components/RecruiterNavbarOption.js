import React from 'react'
import './css/RecruiterNavbar.css'
function RecruiterNavbarOption(props) {
  return (
    <div>
      <li><div className='navbar-option'><div className='icon-container'><props.icon style={{ fontSize: 30 }}/></div> {props.text}</div></li>
    </div>
  )
}

export default RecruiterNavbarOption
