import React, { useEffect, useState } from "react";
import axios from "axios";
import './customer.css';
import NavBar from "./navbar";

const CustomerCard = ({ username, firstname, lastname, email, phone, address }) => (
  <div className="card">
      <div className="card-content">
          <img src="/profile-user.png" alt="user" className="profile-image" />
          <div className="info">
              <div className="username">Username: {username}</div>
              <div className="name">ชื่อจริง: {`${firstname} ${lastname}`}</div>
              <div className="email">อีเมล์: {email}</div>
              <div className="phone">เบอร์โทร: {phone}</div>
              {address && <div className="address">ที่อยู่: {address}</div>} {/* แสดงที่อยู่ถ้ามี */}
          </div>
      </div>
  </div>
);


const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('https://localhost:7003/api/Userbyrole');
                setCustomers(response.data); // ใช้ข้อมูลจาก API
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <NavBar />
            <div className="container">
                <div className="list">
                    {customers.map((customer, index) => (
                        <CustomerCard
                            key={index}
                            username={customer.username}
                            firstname={customer.firstname}
                            lastname={customer.lastname}
                            email={customer.email}
                            phone={customer.phone}
                            address={customer.address}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerList;
