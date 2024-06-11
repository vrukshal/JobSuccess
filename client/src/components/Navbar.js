import React from 'react'
import './css/Navbar.css'
import NavbarOption from './NavbarOption'
function Navbar() {
  return (
    <div>
      <div class="recruiter-navbar">
        <div class="logo">JobSuccess</div>
        <ul class="nav-links">
            <li><a href="#">Overview</a></li>
            <li><a href="#">Who's hiring</a></li>
            <li><a href="#">Career tips</a></li>
        </ul>
        <div class="auth-buttons">

            <NavbarOption class="login-btn" text="Log in"  href="login"/>
            <NavbarOption class="signup-btn" text="Sign up" href="signup"/>
            {/* <a href="#" class="login-btn">Log in</a>
            <a href="#" class="signup-btn">Sign up</a> */}
        </div>
    </div>
    </div>
  )
}

export default Navbar
