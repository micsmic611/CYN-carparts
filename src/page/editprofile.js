import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // นำเข้า jwt-decode
import './editprofile.css';
import NavBar from "./navbar";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    const token = localStorage.getItem("token"); // เปลี่ยนชื่อ key จาก "jwtToken" เป็น "token" ตามที่คุณเก็บไว้ใน Login
    if (token) {
      const decodedToken = jwtDecode(token); // ถอดรหัส Token
      const userId = decodedToken.userId; // ใช้ userId แทน userID

      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://localhost:7003/api/user/${userId}`); // ใช้ userId ที่ถอดรหัส
          if (response.ok) {
            const userData = await response.json();
            setFormData({
              username: userData.username,
              firstname: userData.firstname,
              lastname: userData.lastname,
              email: userData.email,
              phone: userData.phone,
            });
            setOriginalData({
              username: userData.username,
              firstname: userData.firstname,
              lastname: userData.lastname,
              email: userData.email,
              phone: userData.phone,
            });
          } else {
            console.error('Failed to fetch user data:', response.status);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId; // ใช้ userId ที่ถอดรหัส

    const updatedData = {
      userId: userId, // ใช้ userId แทน userID
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      phone: formData.phone,
    };

    try {
      const response = await fetch(`https://localhost:7003/api/UpdateUser/${userId}`, {
        method: 'PUT', // เปลี่ยนเป็น PUT สำหรับการอัปเดต
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // รวม token ใน header
        },
        body: JSON.stringify(updatedData), // ส่งข้อมูลที่อัปเดต
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setOriginalData(formData); // อัปเดตข้อมูลเดิมให้เป็นข้อมูลใหม่
        setIsEditing(false); // ปิดโหมดการแก้ไข
      } else {
        console.error('Failed to update profile:', response.status);
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error connecting to server');
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  return (
    <div>
      <NavBar />
      <div className="form-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Profile</h2>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            First Name
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <div className="button-group">
            <button type="submit" disabled={!isEditing}>ยืนยัน</button>
            <button type="button" onClick={handleEdit}>แก้ไข</button>
            <button type="button" onClick={handleCancel}>ยกเลิก</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
