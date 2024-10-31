import React, { useState } from "react";
import './editprofile.css';
import NavBar from "./navbar";
const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "dotcomx",
    name: "Mr.Com",
    email: "DotcomX.C@gmail.com",
    day: "1",
    month: "March",
    year: "2024",
  });

  const [isEditing, setIsEditing] = useState(false); // สถานะสำหรับโหมดแก้ไข
  const [originalData, setOriginalData] = useState(formData); // เก็บข้อมูลเดิมสำหรับใช้ในกรณียกเลิก

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved successfully!");
    setOriginalData(formData); // เก็บข้อมูลปัจจุบันเป็นข้อมูลเดิม
    setIsEditing(false); // ออกจากโหมดแก้ไข
  };

  const handleCancel = () => {
    setFormData(originalData); // คืนค่าข้อมูลเดิมเมื่อยกเลิก
    setIsEditing(false);
  };

  const handleEdit = () => {
    setOriginalData(formData); // เก็บข้อมูลปัจจุบันก่อนเข้าสู่โหมดแก้ไข
    setIsEditing(true);
  };

  return (
    <div>
    <NavBar/>
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
            disabled={!isEditing} // ปิดใช้งานเมื่อไม่อยู่ในโหมดแก้ไข
          />
        </label>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing} // ปิดใช้งานเมื่อไม่อยู่ในโหมดแก้ไข
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing} // ปิดใช้งานเมื่อไม่อยู่ในโหมดแก้ไข
          />
        </label>
        <label>
          Date of Birth
          <div className="dob-select">
            <select name="day" value={formData.day} onChange={handleChange}>
              {[...Array(31).keys()].map((day) => (
                <option key={day + 1} value={day + 1}>
                  {day + 1}
                </option>
              ))}
            </select>
            <select name="month" value={formData.month} onChange={handleChange}>
              {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                (month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                )
              )}
            </select>
            <select name="year" value={formData.year} onChange={handleChange}>
              {[...Array(100).keys()].map((i) => (
                <option key={2024 - i} value={2024 - i}>
                  {2024 - i}
                </option>
              ))}
            </select>
          </div>
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