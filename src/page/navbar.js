import React from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // นำเข้า jwt-decode
import '@fortawesome/fontawesome-free/css/all.min.css'; // นำเข้า Font Awesome

function NavBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const roleId = decodedToken.roleId;

        if (roleId === "1") {
          navigate("/main");
        } else if (roleId === "2") {
          navigate("/manager");
        } else {
          navigate("/main");
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // ลบ token ออกจาก local storage
    navigate("/login"); // นำทางไปที่หน้า login
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span onClick={handleLogoClick} className="home">CYN Carpart</span>
      </div>
      <div className="navbar-icons">
        <Link to="/profile">
          <img src="/profile-user.png" alt="user" />
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> {/* ไอคอน Logout */}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
