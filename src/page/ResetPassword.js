import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7003/api/reset-password?username=${username}&newPassword=${newPassword}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Password reset successfully');
        navigate('/');
      } else {
        setErrorMessage('Failed to reset password');
      }
    } catch (error) {
      setErrorMessage('Error connecting to server');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="reset-password-logo">
          <img src="/CAP_CAR.png" alt="CYN carparts" />
        </div>
        <h2>CYN carparts</h2>
        <form onSubmit={handleResetPassword}>
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
              type={showPassword ? 'text' : 'password'}
              placeholder="NewPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <img 
              src={showPassword ? "/view.png" : "/hide.png"} 
              alt="Toggle Password Visibility" 
              className="icon-eye" 
              onClick={handleTogglePassword} 
            />
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="ConfirmNewPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img 
              src={showPassword ? "/view.png" : "/hide.png"} 
              alt="Toggle Password Visibility" 
              className="icon-eye" 
              onClick={handleTogglePassword} 
            />
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit" className="confirm-btn">Confirm</button>
        </form>
        <p className="login-text">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;