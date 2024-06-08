import React from 'react'
import './css/RecruiterNavbar.css'
import { useNavigate } from 'react-router-dom'
function RecruiterNavbarOption(props) {
    const navigate = useNavigate();
    function NavigateToURL(url){
        console.log(url);
        navigate(url);
    }
  return (
    <div>
      <li><div className='navbar-option' onClick={() => NavigateToURL(props.onClickUrl)}><div className='icon-container'><props.icon style={{ fontSize: 30 }}/></div> {props.text}</div></li>
    </div>
  )
}

export default RecruiterNavbarOption
