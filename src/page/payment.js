import React from "react";
import { useLocation, useNavigate  } from 'react-router-dom';
import './payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, total } = location.state || { cart: [], total: 0 }; // รับข้อมูลจาก state ที่ส่งมา

  const handleCancel = () => {
    navigate('/cart'); // เปลี่ยนเส้นทางกลับไปที่หน้าตะกร้าสินค้า
  };

  const handleConfirm = () => {
    navigate('/success');
  };

  const currentDate = new Date().toLocaleDateString("th-TH", {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });

    return (
      <div className="payment-page">
      <div className="payment-container">
      <header className="payment-header">
        <h1>CYN Carpart</h1>
      </header>

      <div className="payment-content">
        <img src="https://via.placeholder.com/150" alt="QR Code" className="qr-code" />
        <h2>การชำระเงิน</h2>
        <p className="payment-amount">รวมทั้งหมด: ฿{total.toFixed(2)}</p>
        <div className="order-items">
          {cart.map((item, index) => (
            <div key={index} className="order-item">
            </div>
          ))}
        </div>
        <p className="payment-date">{currentDate}</p>
        <p className="order-number">เลขที่ใบสั่งซื้อ #165558</p>
        <p className="customer-info">ชื่อ: คุณลูกค้า</p>
        <p className="shipping-info">หมายเลขการจัดส่ง: 6459555 จัดส่งโดย: Kerry</p>
      </div>

      <div className="button-container">
      <button className="cancel-button" onClick={handleCancel}>ยกเลิก</button>
        <button className="confirm-button" onClick={handleConfirm}>ยืนยัน</button>
      </div>

      <div className="upload-button-container">
        <button className="upload-button">อัปโหลดรูป</button>
        </div>
      </div>
    </div>
      );
}

export default Payment;