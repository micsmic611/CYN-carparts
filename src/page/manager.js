import React from "react";
import { useNavigate } from "react-router-dom";
import './manger.css';
import NavBar from "./navbar";
function Manager(){
    const navigate = useNavigate();

    const handleAddProduct = () => {
        console.log("เพิ่มสินค้า");
        navigate('/AddProduct');
      };
    
      const handleEditProduct = () => {
        console.log("แก้ไขสินค้า");
        navigate('/ProductListing');
      };
    
      const handleCustomer = () => {
        console.log("ลูกค้า");
        navigate('/customer');
      };
    
      const handleReport = () => {
        console.log("รายงานสินค้า");
        navigate('/MonthlyReport');
      };

    return (<div>
          <NavBar/>
        <div className="manage-container">
      <div className="manage-card">
        <h2 className="manage-title">CYN Carpart</h2>
        <div className="button-grid">
          <button onClick={handleAddProduct} className="button add-product">เพิ่มสินค้า</button>
          <button onClick={handleEditProduct} className="button edit-product">แก้ไขสินค้า</button>
          <button onClick={handleCustomer} className="button customer">ลูกค้า</button>
          <button onClick={handleReport} className="button report-product">รายงาน</button>
        </div>
      </div>
    </div>
    </div>
    );
}

export default Manager;