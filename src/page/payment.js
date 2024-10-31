import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ติดตั้ง axios ถ้ายังไม่ได้ติดตั้ง
import NavBar from './navbar';
import './payment.css';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, total } = location.state || { cart: [], total: 0 };

    // ใช้ getItem เพื่อนำเข้า buy_id
    const buyIdFromStorage = localStorage.getItem('buyid');
    const userIdFromStorage = localStorage.getItem('userId');
    const locationIdFromStorage = localStorage.getItem('locationId');

    useEffect(() => {
      // ทำการตรวจสอบค่าต่าง ๆ ที่มีใน Local Storage
      console.log('buyId:', buyIdFromStorage);
      console.log('userId:', userIdFromStorage);
      console.log('locationId:', locationIdFromStorage);
  }, [buyIdFromStorage, userIdFromStorage, locationIdFromStorage]);
  

  const handlePayment = async () => {
    try {
        // ฟังก์ชันสำหรับการจ่ายเงิน
        const response = await axios.post('https://localhost:7003/api/Payment/update', {
            buyId: buyIdFromStorage,
            userId: userIdFromStorage,
        });

        // เช็ครหัสสถานะ HTTP
        if (response.status === 200) {
            // ถ้าได้รับรหัสสถานะ 200 นำผู้ใช้ไปยังหน้าสำเร็จ
            navigate('/success'); // เปลี่ยน '/success' เป็น path ที่คุณต้องการ
        } else {
            console.error('Unexpected response status:', response.status);
            // สามารถจัดการกับกรณีที่ไม่ตรงตามที่คาดหวังได้ที่นี่
        }
    } catch (error) {
        console.error('Error during payment:', error);
        // จัดการกับ error ที่เกิดขึ้นได้ที่นี่
    }
};
    const handleCancel = () => {
        // ฟังก์ชันสำหรับการยกเลิก
        navigate('/cart'); // กลับไปที่หน้า Cart
    };

    return (
        <div>
            <NavBar />
            <div className="payment-container">
                <img src="https://via.placeholder.com/150" alt="QR Code" className="qr-code" />
                <h2>หน้าชำระเงิน</h2>
                <p className="order-number">เลขที่ใบสั่งซื้อ: {buyIdFromStorage}</p>
                <p>รวมยอดชำระ: ฿{total.toFixed(2)}</p>
                <h3>รายการสินค้า:</h3>
                <ul>
                    {cart.map((product, index) => (
                        <li key={index}>
                            {product.productName} - ฿{product.totalPrice}
                        </li>
                    ))}
                </ul>
                <div className="button-container">
                    <button onClick={handleCancel} className="cancel-button">ยกเลิก</button>
                    <button onClick={handlePayment} className="pay-button">จ่ายเงิน</button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
