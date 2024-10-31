import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';// อย่าลืมติดตั้ง jwt-decode ด้วย npm install jwt-decode
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://localhost:7003/api/login', {
        method: 'POST', // ใช้ POST ในการเข้าสู่ระบบ
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // ส่ง username และ password ในรูปแบบ JSON
      });

      const data = await response.json();

      if (response.ok) {
        // เก็บ token ใน local storage
        localStorage.setItem('token', data.token);

        // ถอดรหัส JWT
        const decodedToken = jwtDecode(data.token);
        console.log(decodedToken); // แสดงผลลัพธ์ของการถอดรหัส
        if (decodedToken.roleId === "1") { // เปลี่ยนจาก roleid เป็น roleId
          navigate('/main');
      } else if (decodedToken.roleId === "2") {
          navigate('/manager');
      } else {
          setErrorMessage('Unauthorized access');
      }
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('Error connecting to server');
    }
  };
  const handlemanage = () => {
    navigate('/ResetPassword'); // Navigate to register page when sign up is clicked
  };
  const handleSignUp = () => {
    navigate('/register'); // Navigate to register page when sign up is clicked
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
            forgot your <a href="#" onClick={handlemanage}>password</a>?
          </p>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-text">
          Don’t have an account? <a href="#" onClick={handleSignUp}>sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;