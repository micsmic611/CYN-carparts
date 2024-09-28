// src/components/Login.tsx
import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/CAP_CAR.png';
// Login.tsx
import { useNavigate } from 'react-router-dom';  // ใช้เพื่อเรียกใช้งานการนำทาง
import {mockUsers} from '../mocks/mockUsers';  // สมมติว่าคุณมี mock data ของผู้ใช้

function Login() {
  const [username, setUsername] = useState<string>('');  // state สำหรับ username
  const [password, setPassword] = useState<string>('');  // state สำหรับ password
  const navigate = useNavigate();  // ใช้ useNavigate เพื่อจัดการการนำทาง

  // ฟังก์ชันการตรวจสอบ username และ password
  const handleLogin = () => {
    const user = mockUsers.find((user) => user.username === username && user.password === password);
    if (user) {
      console.log('Login successful:', user.username);
      navigate('/main');  // เมื่อ login สำเร็จ จะนำไปที่หน้า Main
    } else {
      console.log('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="CYN Carpark" />  {/* แสดงโลโก้ */}
      </div>
      <div className="CYN">
        <h2>CYN carparts</h2>
      </div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>  {/* เมื่อกดปุ่ม จะเรียกฟังก์ชัน handleLogin */}
      <div className="login-footer">
                <a href="#">Forgot your password?</a>
                <a href="#">Don't have an account?</a>
                <a href="#"> Sign up</a>
            </div>
    </div>
  );
}

export default Login;
