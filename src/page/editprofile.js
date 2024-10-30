import React, { useState } from "react";
import './editprofile.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "dotcomx",
    name: "Mr.Com",
    email: "DotcomX.C@gmail.com",
    day: "1",
    month: "March",
    year: "2024",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved successfully!");
  };

  return (
    <div className="form-container">
      <header className="header">
        <h1>CYN Carport</h1>
      </header>
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Profile</h2>
        <label>
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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
          <button type="submit">ยืนยัน</button>
          <button type="button">แก้ไข</button>
          <button type="button">ยกเลิก</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;