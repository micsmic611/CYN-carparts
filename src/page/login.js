import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);  // state สำหรับแสดง/ซ่อนรหัสผ่าน
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);  // สลับระหว่างแสดงและซ่อนรหัสผ่าน
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        alert('Login Successful');
        navigate('/main');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('Error connecting to server');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="/CAP_CAR.png" alt="CYN carparts" />
        </div>
        <h2>CYN carparts</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}  // แสดงเป็นข้อความหรือรหัส
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img 
              src={showPassword ? "/view.png" : "/hide.png"} 
              alt="Toggle Password Visibility" 
              className="icon-eye" 
              onClick={handleTogglePassword}  // คลิกเพื่อสลับการแสดงรหัสผ่าน
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <p className="forgot-password">
            forgot your <a href="#">password</a>?
          </p>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-text">
          Don’t have an account? <a href="#">sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
