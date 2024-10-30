import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import NavBar from './navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './cart.css'
import axios from 'axios';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const [showDialog, setShowDialog] = useState(false); // จัดการการแสดง dialog
  const [selectedProduct, setSelectedProduct] = useState(null); // สินค้าที่จะลบ
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // state สำหรับเก็บหมวดหมู่ที่เลือก
  const [selectedProducts, setSelectedProducts] = useState([]); // สินค้าที่เลือกเพื่อจ่าย
  const [selectedAddress, setSelectedAddress] = useState(''); // ที่อยู่สำหรับจัดส่ง
  const [paymentMethod, setPaymentMethod] = useState('cash'); // วิธีการชำระเงิน (ค่าเริ่มต้นคือเงินสด)
  const navigate = useNavigate();

// ส่งข้อมูลคำสั่งซื้อไปยัง API
const placeOrder = async () => {
  const orderData = {
    products: selectedProducts.map((id) =>
      cart.find((product) => product.id === id)
    ),
    total: calculateTotal(),
    address: selectedAddress,
    paymentMethod: paymentMethod,
  };

  try {
    const response = await axios.post('https://your-api-endpoint.com/orders', orderData);
    console.log('Order placed successfully:', response.data);

    // เช็ควิธีการชำระเงิน
    if (paymentMethod === 'qr') {
      // ไปยังหน้าการชำระเงิน (payment page)
      navigate('/payment', { state: { total: orderData.total } });
    } else if (paymentMethod === 'cash') {
      // ไปยังหน้าสำเร็จ (success page)
      navigate('/success');
    }
  } catch (error) {
    console.error('Error placing order:', error);
  }
};
  // ฟังก์ชันสำหรับการเลือกสินค้า
  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  // คำนวณยอดรวมของสินค้าที่เลือก
    // ฟังก์ชันคำนวณยอดรวมทั้งหมด
    const calculateTotal = () => {
      return cart.reduce((total, product) => {
        const price = parseFloat(product.price) || 0; // เปลี่ยน price ให้เป็นตัวเลข
        const quantity = parseInt(product.quantity) || 1; // ตั้งค่าเริ่มต้นให้ quantity เป็น 1 ถ้าไม่มีการกำหนด
        return total + price * quantity;
      }, 0);
    };





  useEffect(() => {
    // เรียกใช้ mock API เพื่อดึงข้อมูลสินค้า
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setSearchResults(data); // เริ่มต้นแสดงสินค้าทั้งหมด
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleRemove = (product) => {
    setSelectedProduct(product); // ตั้งค่าข้อมูลสินค้าที่จะลบ
    setShowDialog(true); // เปิด dialog ยืนยัน
  };

  const confirmRemove = () => {
    removeFromCart(selectedProduct); // ลบสินค้าออกจากตะกร้า
    setShowDialog(false); // ปิด dialog
    setSelectedProduct(null); // รีเซ็ตสินค้า
  };

  const cancelRemove = () => {
    setShowDialog(false); // ปิด dialog โดยไม่ลบสินค้า
    setSelectedProduct(null); // รีเซ็ตสินค้า
  };








  const handleSearch = () => {
    setCurrentPage(1); // รีเซ็ตไปที่หน้าแรกของผลลัพธ์
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prevCategories =>
      prevCategories.includes(category)
        ? prevCategories.filter(c => c !== category) // ถ้าหมวดหมู่ถูกเลือกแล้ว ให้เอาออก
        : [...prevCategories, category] // ถ้ายังไม่ถูกเลือก ให้เพิ่มเข้าไป
    );
  };

  return (
    <div>
      <NavBar />
      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h3>ประเภท</h3>
          <div className="category">
            <input
              type="checkbox"
              id="frontBumper"
              name="frontBumper"
              onChange={() => handleCategoryChange('กันชนหน้า')}
            />
            <label htmlFor="frontBumper">กันชนหน้า</label>
          </div>
          <div className="category">
            <input
              type="checkbox"
              id="backBumper"
              name="backBumper"
              onChange={() => handleCategoryChange('กันชนหลัง')}
            />
            <label htmlFor="backBumper">กันชนหลัง</label>
          </div>
          <div className="category">
            <input
              type="checkbox"
              id="backLight"
              name="backLight"
              onChange={() => handleCategoryChange('ไฟหน้าหลัง')}
            />
            <label htmlFor="backLight">ไฟหน้าหลัง</label>
          </div>
          {/* เพิ่มหมวดหมู่อื่น ๆ ตามต้องการ */}
        </aside>

        {/* Main content */}
        <div className="main-content">
          {/* Search bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="search"
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <button className="search-button" onClick={handleSearch}>
              <img src="/search.png" alt="searrch" />
            </button>
            <button className="list-button">
              <img src="/list.png" alt="list" />
            </button>
            <Link to="/cart" className="cart-button"> {/* ปรับให้เป็น Link ไปยังหน้าตะกร้า */}
              <img src="/shopping-cart.png" alt="cart" />
            </Link>
            <div className="icon-container">
              <i className="fa fa-user"></i>

              <i className="fa fa-home"></i>
            </div>
          </div>
          <h2>ตะกร้าสินค้า</h2>
          <div className="cart-container">
            {cart.length > 0 ? (
              <ul>
                {cart.map((product) => (
                  <li key={product.id} className="cart-item">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                    />
                    <img src={product.img} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>จำนวน: {product.quantity}</p>
                      <p>ราคา: ฿{product.price}</p>
                      <button
                        onClick={() => removeFromCart(product)}
                        className="remove-button"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>ไม่มีสินค้าในตะกร้า</p>
            )}

          </div>
          

          {/* ที่อยู่จัดส่ง */}
          <div className="address-section">
            <h3>กรอกอยู่สำหรับจัดส่ง</h3>
            <textarea
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
              placeholder="กรุณากรอกที่อยู่สำหรับจัดส่ง"
            />
          </div>

          {/* วิธีการชำระเงิน */}
          <div className="payment-method-section">
            <h3>เลือกวิธีการชำระเงิน</h3>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
              />
              เงินสด
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="qr"
                checked={paymentMethod === 'qr'}
                onChange={() => setPaymentMethod('qr')}
              />
              แสกนจ่ายเงิน QR Code
            </label>
          </div>

{/* สรุปยอดรวมและปุ่มสั่งซื้อ */}
          <div className="cart-summary">
            <p>รวม ({cart.length} สินค้า): ฿{calculateTotal().toFixed(2)}</p>
            <button className="order-button" onClick={placeOrder}>
              สั่งสินค้า
            </button>   
          </div>

        </div>



        {/* Dialog ยืนยันการลบ */}
        {showDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <p>คุณต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?</p>
              <div className="dialog-buttons">
                <button onClick={confirmRemove} className="confirm-button">ตกลง</button>
                <button onClick={cancelRemove} className="cancel-button">ยกเลิก</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;


