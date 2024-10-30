import React from "react";


function Manager(){
    const handleAddProduct = () => {
        console.log("เพิ่มสินค้า");
      };
    
      const handleEditProduct = () => {
        console.log("แก้ไขสินค้า");
      };
    
      const handleCustomer = () => {
        console.log("ลูกค้า");
      };
    
      const handleDeleteProduct = () => {
        console.log("ลบสินค้า");
      };

    return (
        <div className="manage-container">
      <div className="manage-card">
        <h2 className="manage-title">CYN Corpprt</h2>
        <div className="button-grid">
          <button onClick={handleAddProduct} className="button add-product">เพิ่มสินค้า</button>
          <button onClick={handleEditProduct} className="button edit-product">แก้ไขสินค้า</button>
          <button onClick={handleCustomer} className="button customer">ลูกค้า</button>
          <button onClick={handleDeleteProduct} className="button delete-product">ลบสินค้า</button>
        </div>
      </div>
    </div>
    );
}

export default Manager;