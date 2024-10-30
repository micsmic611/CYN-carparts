import React from "react";
import './customer.css';
import NavBar from "./navbar";

const customers = [
    { username: "dotcomx", title: "Mr.Com", email: "DotcomX.C@gmail.com" },
    { username: "IamCat", title: "Mr.Ice", email: "IceCat.C@gmail.com" },
    { username: "HereHam", title: "Mr.Ham", email: "Hereham.H@gmail.com" },
    { username: "eveziper", title: "Mrs.Eve", email: "Eveziper.E@gmail.com" },
    { username: "The 1975", title: "Mr.Pun", email: "The1975pun.P@gmail.com" },
    { username: "Bino", title: "Mr.Bino", email: "Bino.B@gmail.com" },
  ];

const CustomerCard = ({ username, title, email }) => (
    <div className="card">
      <div className="username">{username}</div>
      <div className="title">{title}</div>
      <a href={`mailto:${email}`} className="email">
        {email}
      </a>
    </div>
  );

const CustomerList = () => (<div>
  <NavBar/>
    <div className="container">
    
    <div className="list">
      {customers.map((customer, index) => (
        <CustomerCard
          key={index}
          username={customer.username}
          title={customer.title}
          email={customer.email}
        />
      ))}
    </div>
  </div>
  </div>
);

export default CustomerList;