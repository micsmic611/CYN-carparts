import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ตรวจสอบรหัสผ่านและการยืนยันรหัสผ่าน
        if (formData.password !== formData.confirmPassword) {
            setError('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
            return;
        }

        setError('');
        setSuccessMessage('');

        const dataToSend = {
            username: formData.username,
            password: formData.password,
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            phone: formData.phone,
            address: formData.address
        };

        try {
            const response = await fetch('https://localhost:7003/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                setSuccessMessage('ลงทะเบียนสำเร็จ!');
                setFormData({
                    username: '',
                    password: '',
                    confirmPassword: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    phone: '',
                    address: ''
                });
                // เปลี่ยนหน้าไปยังหน้า Login
                navigate('/login');
            } else {
                setError('การลงทะเบียนล้มเหลว');
            }
        } catch (error) {
            setError('เกิดข้อผิดพลาดในการเชื่อมต่อ API');
            console.error('API Error:', error);
        }
    };

    const handleSignin = () => {
        navigate('/'); // Navigate to register page when sign up is clicked
      };

    return (
        <div class="register-body-container">
        <div className="register-container">
            <div className="register-header">
                <img src="car-logo.png" alt="CYN Carparts Logo" className="logo" />
                <h2>CYN Carparts</h2>
            </div>
            <form onSubmit={handleSubmit}>
            <div class="register-input">
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
                <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required></textarea>
            </div>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <button type="submit" className="register-button">Register</button>
                <p className="signup-text">
          Do have an account? <a href="#" onClick={handleSignin}>sign in</a>
        </p>
            </form>
        </div>
        </div>
    );
}

export default Register;