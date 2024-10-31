import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import './editprofile.css';
import NavBar from "./navbar";

const ConfirmDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <p>ยืนยันการแก้ไขหรือไม่?</p>
        <button onClick={onConfirm}>ตกลง</button>
        <button onClick={onCancel}>ยกเลิก</button>
      </div>
    </div>
  );
};

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      fetch(`https://localhost:7003/api/user/${userId}`)
        .then(response => response.json())
        .then(data => {
          setFormData(data);
          setOriginalData(data);
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const openDialog = () => {
    const hasChanges = Object.keys(formData).some(
      key => formData[key] !== originalData[key]
    );

    if (!hasChanges) {
      alert("ไม่มีการเปลี่ยนแปลงข้อมูล");
      return;
    }

    setIsDialogOpen(true); // เปิด dialog
  };

  const handleConfirmEdit = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      try {
        const response = await fetch(`https://localhost:7003/api/UpdateUser/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("แก้ไขข้อมูลสำเร็จ");
          setOriginalData(formData); // อัพเดตข้อมูลต้นฉบับเป็นค่าใหม่
          setIsDialogOpen(false); // ปิด dialog
          setIsEditing(false);
        } else {
          alert("ไม่สามารถแก้ไขข้อมูลได้");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    }
  };

  const handleCancelEdit = () => {
    setIsDialogOpen(false); // ปิด dialog โดยไม่บันทึกการเปลี่ยนแปลง
  };

  return (
    <div>
      <NavBar />
      <div className="form-container">
        <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
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
            First Name
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
             
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
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
            Phone
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              
            />
          </label>
          <div className="button-group">
            <button type="button" onClick={openDialog}>แก้ไข</button>
          </div>
        </form>

        {isDialogOpen && (
          <ConfirmDialog onConfirm={handleConfirmEdit} onCancel={handleCancelEdit} />
        )}
      </div>
    </div>
  );
};

export default ProfileForm;