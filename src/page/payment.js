import React from "react";
import './payment.css';

function Payment() {
    return (
        <div className="payment-container">
          <header className="payment-header">
            <h1>CYN Carpart</h1>
          </header>
    
          <div className="payment-content">
            <img src="https://via.placeholder.com/150" alt="QR Code" className="qr-code" />
            <h2>การชำระเงิน</h2>
            <p className="payment-amount">THB 990.00</p>
            <p className="payment-date">19/9/2567</p>
            <p className="order-number">เลขที่ใบสั่งซื้อ #165558</p>
            <p className="customer-info">ชื่อ: คุณลูกค้า</p>
            <p className="shipping-info">หมายเลขการจัดส่ง: 6459555 จัดส่งโดย: Kerry</p>
          </div>
    
          <div className="button-container">
            <button className="cancel-button">ยกเลิก</button>
            <button className="confirm-button">ยืนยัน</button>
          </div>
    
          <div className="upload-button-container">
            <button className="upload-button">อัปโหลดรูป</button>
          </div>
        </div>
      );
}

export default Payment;