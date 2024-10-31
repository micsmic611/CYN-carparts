import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import NavBar from './navbar';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './cart.css';

const getImagePath = (filename) => require(`../img/${filename}`);

function Cart() {
    const { removeFromCart } = useContext(CartContext);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [showAddLocation, setShowAddLocation] = useState(false);
    const navigate = useNavigate();

    // Fetch ข้อมูลตะกร้าสินค้า
    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem('token');
            let userId = null;
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    userId = decodedToken.userId;
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            }
            if (userId) {
                try {
                    const response = await fetch(`https://localhost:7003/api/Cart/${userId}`);
                    const data = await response.json();
                    setCart(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            }
        };

        fetchCart();
    }, []);

    // Fetch สถานที่จัดส่ง
    useEffect(() => {
        const fetchLocations = async () => {
            const token = localStorage.getItem('token');
            let userId = null;
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    userId = decodedToken.userId;
                } catch (error) {
                    console.error('Error decoding token:', error);
                }
            }

            if (userId) {
                try {
                    const response = await fetch(`https://localhost:7003/api/Product/Location?User_id=${userId}`);
                    const data = await response.json();
                    setLocations(data);
                } catch (error) {
                    console.error('Error fetching locations:', error);
                }
            }
        };

        fetchLocations();
    }, [cart]); // ทำการ fetch ทุกครั้งที่ cart มีการเปลี่ยนแปลง

    // ฟังก์ชันสำหรับเพิ่มสถานที่จัดส่ง
    const handleAddLocation = () => {
        const token = localStorage.getItem('token');
        let userId = null;
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                userId = decodedToken.userId;
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }

        const payload = { userId: userId, address: newAddress };

        fetch('https://localhost:7003/api/Location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(newLocation => {
                setLocations([...locations, newLocation]);
                setShowAddLocation(false);
                setNewAddress('');
            })
            .catch(error => console.error('Error adding location:', error));
    };

    // ฟังก์ชันสำหรับการลบสินค้าออกจากตะกร้า
    const handleRemove = (product) => {
        setSelectedProduct(product);
        setShowDialog(true);
    };

    const confirmRemove = () => {
        fetch(`https://localhost:7003/api/Cart/${selectedProduct.cartId}`)
            .then(response => response.json())
            .then(data => {
                // บันทึกข้อมูลลงใน local storage
                localStorage.setItem('cartItem', JSON.stringify(data));

                // ลบสินค้าออกจากตะกร้า
                return fetch(`https://localhost:7003/api/Cart/${selectedProduct.cartId}`, {
                    method: 'DELETE',
                });
            })
            .then(() => {
                setCart(cart.filter(item => item.cartId !== selectedProduct.cartId));
                setShowDialog(false);
                navigate('/payment', { state: { cart, total: calculateTotal(), ...JSON.parse(localStorage.getItem('cartItem')) } });
            })
            .catch(error => console.error('Error removing item from cart:', error));
    };

    const calculateTotal = () => cart.reduce((total, product) => total + parseFloat(product.totalPrice), 0);

    const handleOrder = async () => {
        const token = localStorage.getItem('token');
        let userId = null;
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                userId = decodedToken.userId;
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    
        const cartIds = cart.map(item => item.cartId);
        const locationId = selectedLocation;
        const shippingId = deliveryMethod === 1 ? 1 : 2; // Set shipping ID based on deliveryMethod selection
    
        const payload = {
            userId,
            cartIds,
            locationId,
            shippingId
        };
    
        try {
            const response = await fetch('https://localhost:7003/api/Payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            
            // บันทึกข้อมูล userId และ locationId ลงใน local storage
            localStorage.setItem('userId', userId);
            localStorage.setItem('locationId', locationId);
            localStorage.setItem('buyid', data.buy_id);
    
            // นำทางไปยังหน้า Payment
            navigate('/payment', { state: { cart, total: calculateTotal(), ...data } });
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    if (loading) return <p>กำลังโหลดข้อมูล...</p>;

    return (
        <div>
            <NavBar />
            <div className="main-container">
                <div className="main-content">
                    <h2>ตะกร้าสินค้า</h2>
                    <div className="cart-container">
                        {cart.length > 0 ? (
                            <ul>
                                {cart.map((product, index) => (
                                    <li key={index} className="cart-item">
                                        <img
                                            src={getImagePath(product.productImgPath.split('\\').pop())}
                                            alt={product.productName}
                                        />
                                        <div>
                                            <h3>{product.productName}</h3>
                                            <p>จำนวน: {product.quantity}</p>
                                            <p>ราคา: ฿{product.totalPrice}</p>
                                            <button onClick={() => handleRemove(product)} className="remove-button">
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

                    <div className="choose">
                        <div className="delivery-methods">
                            <h3>เลือกวิธีการจัดส่ง:</h3>
                            <div
                                className={`delivery-option ${deliveryMethod === 1 ? 'selected' : ''}`}
                                onClick={() => setDeliveryMethod(1)}
                            >
                                เคอรี่
                            </div>
                            <div
                                className={`delivery-option ${deliveryMethod === 2 ? 'selected' : ''}`}
                                onClick={() => setDeliveryMethod(2)}
                            >
                                ไปรษณีย์
                            </div>
                        </div>

                        <div className="location-selection">
                            <h3>เลือกสถานที่:</h3>
                            {locations.map((location) => (
                                <div
                                    key={location.location_id}
                                    className={`location-option ${selectedLocation === location.location_id ? 'selected' : ''}`}
                                    onClick={() => setSelectedLocation(location.location_id)}
                                >
                                    {location.address}
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setShowAddLocation(!showAddLocation)}>
                            เพิ่มสถานที่จัดส่ง
                        </button>

                        {showAddLocation && (
                            <div className="add-location-form">
                                <input
                                    type="text"
                                    placeholder="กรอกที่อยู่ใหม่"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                />
                                <button onClick={handleAddLocation}>ยืนยัน</button>
                            </div>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="cart-summary">
                            <p>รวม ({cart.length} สินค้า): ฿{calculateTotal().toFixed(2)}</p>
                            <button onClick={handleOrder} className="order-button">สั่งสินค้า</button>
                        </div>
                    )}
                </div>
            </div>

            {showDialog && (
                <div className="dialog">
                    <p>คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้ออกจากตะกร้า?</p>
                    <button onClick={confirmRemove}>ใช่</button>
                    <button onClick={() => setShowDialog(false)}>ไม่</button>
                </div>
            )}
        </div>
    );
}

export default Cart;
