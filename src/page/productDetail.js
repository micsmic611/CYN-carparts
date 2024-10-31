import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './productDetail.css';
import NavBar from './navbar';
import { CartContext } from './CartContext';

const getImagePath = (filename) => {
    return require(`../img/${filename}`); // ตรวจสอบให้แน่ใจว่าใช้ path ที่ถูกต้อง
};

function ProductDetail() {
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    // ข้อมูล mock สำหรับรีวิว
    const reviews = [
        { id: 1, user: "cim", comment: "สินค้าคุณภาพดีมาก!", rating: 5 },
        { id: 2, user: "yok", comment: "คุ้มค่ากับราคา", rating: 4 },
        { id: 3, user: "guy", comment: "ส่งเร็วมาก แต่สินค้าขาดบางอย่าง", rating: 3 },
        { id: 4, user: "nan", comment: "ส่งเร็วมาก แต่สินค้าขาดบางอย่าง", rating: 4 }
    ];
    useEffect(() => {
        // เรียกใช้ API เพื่อดึงข้อมูลสินค้าตาม id https://localhost:7003/api/Product/ProductsWithCategory1?productId=${id}
        fetch(`https://localhost:7003/api/Product/ProductsWithCategory1?productId=${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleIncrease = () => {
        // เช็คว่า quantity น้อยกว่าสต็อกก่อนเพิ่ม
        if (product && quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleDecrease = () => {
        // ป้องกันไม่ให้ quantity ต่ำกว่า 1
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handleBuy = () => {
        setShowDialog(true);
    };

    const confirmBuy = () => {
        const userId = localStorage.getItem('userId'); // ดึง userId จาก localStorage
        const productId = product.productId; // ดึง productId จากสินค้า
        const quantityToSend = quantity; // จำนวนสินค้า

        const payload = {
            userId: parseInt(userId), // แปลงให้เป็นตัวเลข
            productId: productId,
            quantity: quantityToSend
        };

        // ส่งข้อมูลไปยัง API
        fetch('https://localhost:7003/api/Cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Product added to cart:', data);
                addToCart({ ...product, quantity }); // เพิ่มสินค้าใน context ของตะกร้า
                setShowDialog(false); // ปิด dialog
                navigate('/cart'); // นำไปยังหน้าตะกร้าสินค้า
            })
            .catch(error => {
                console.error('Error adding product to cart:', error);
            });
    };

    const cancelBuy = () => {
        setShowDialog(false);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBar />
            <div className="main-container">
                <aside className="sidebar">
                    <h3>ประเภท</h3>
                    <div className="category">
                        <input
                            type="checkbox"
                            id="frontBumper"
                            name="frontBumper"
                        />
                        <label htmlFor="frontBumper">กันชนหน้า</label>
                    </div>
                    <div className="category">
                        <input
                            type="checkbox"
                            id="backBumper"
                            name="backBumper"
                        />
                        <label htmlFor="backBumper">กันชนหลัง</label>
                    </div>
                    <div className="category">
                        <input
                            type="checkbox"
                            id="backLight"
                            name="backLight"
                        />
                        <label htmlFor="backLight">ไฟหน้าหลัง</label>
                    </div>
                </aside>

                <div className="main-content">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="search"
                            className="search-bar"
                        />
                        <button className="search-button">
                            <img src="/search.png" alt="search" />
                        </button>
                        <Link to="/cart" className="cart-button">
                            <img src="/shopping-cart.png" alt="cart" />
                        </Link>
                    </div>

                    <div className="product-detail-container">
                        <div className="product-detail">
                            <img src={getImagePath(product.productImgPath.split('\\').pop())} alt={product.productName} />
                            <div className="product-info">
                                <h2>ชื่อสินค้า: {product.productName}</h2>
                                <p>ราคา: {product.price} บาท</p>
                                <div className="quantity-control">
                                    <button onClick={handleDecrease}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={handleIncrease}>+</button>
                                </div>
                                <button onClick={handleBuy} className="buy-button">ซื้อ</button>
                                <div className="product-description">
                                    <p>รายละเอียดสินค้า: {product.productDescription}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                                                    {/* กล่องรีวิว */}
                                                    <div className="product-review">
                                    <h3>รีวิวสินค้า</h3>
                                    {reviews.map(review => (
                                        <div key={review.id} className="review-item">
                                            <strong>{review.user}</strong>
                                            <p>{review.comment}</p>
                                            <p>⭐ {review.rating} / 5</p>
                                        </div>
                                    ))}
                                    
                                </div>
                </div>
            </div>

            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <p>คุณต้องการเพิ่มสินค้านี้ในตะกร้าหรือไม่?</p>
                        <div className="dialog-buttons">
                            <button onClick={confirmBuy} className="confirm-button">ตกลง</button>
                            <button onClick={cancelBuy} className="cancel-button">ยกเลิก</button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default ProductDetail;
