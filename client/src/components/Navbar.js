import React from 'react'
import './css/Navbar.css'
function Navbar() {
  return (
    <div>
      <div class="navbar">
        <div class="logo">JobSuccess</div>
        <ul class="nav-links">
            <li><a href="#">Overview</a></li>
            <li><a href="#">Who's hiring</a></li>
            <li><a href="#">Career tips</a></li>
        </ul>
        <div class="auth-buttons">
            <a href="#" class="login-btn">Log in</a>
            <a href="#" class="signup-btn">Sign up</a>
        </div>
    </div>
    </div>
  )
}

export default Navbar
