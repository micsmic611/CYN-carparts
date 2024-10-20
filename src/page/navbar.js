import React from 'react';
import './navbar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>CYN Carpart</h1>
      </div>
      <div className="navbar-icons">
      <img src="/profile-user.png" alt="user" />
      </div>
    </nav>
  );
}

export default NavBar;
