import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

function NavBar() {

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <Link to="/main" className="home">CYN Carpart</Link>
      </div>
      <div className="navbar-icons">
      <Link to="/profile">
      <img src="/profile-user.png" alt="user" />
      </Link>
      </div>
    </nav>
  );
}

export default NavBar;
