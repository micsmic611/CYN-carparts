import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate ,Link } from 'react-router-dom';
import './productDetail.css';
import NavBar from './navbar';
import { CartContext } from './CartContext';


function ProductDetail() {
    const [showDialog, setShowDialog] = useState(false); // จัดการการแสดงผล dialog
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext); // ใช้ Context ของตะกร้าสินค้า
    const [quantity, setQuantity] = useState(1); // เริ่มต้นที่จำนวน 1
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // state สำหรับเก็บหมวดหมู่ที่เลือก
    const productsPerPage = 6;
    const { id } = useParams(); // รับ id ของสินค้าที่ถูกส่งมาจาก URL
    const [product, setProduct] = useState(null);
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

    // คำนวณหน้าสินค้า
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // ฟังก์ชันกรองสินค้า
    const filteredProducts = searchResults.filter(product => {
        const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(category =>
            product.description.includes(category) // ตรวจสอบว่ามีหมวดหมู่ที่เลือกใน description หรือไม่
        );
        return matchesSearchTerm && matchesCategory;
    });

    // สินค้าที่แสดงในหน้าปัจจุบัน
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // จำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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


  useEffect(() => {
    // เรียกใช้ mock API เพื่อดึงข้อมูลสินค้าตาม id
    fetch(`http://localhost:5000/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);
  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleBuy = () => {
    setShowDialog(true); // เปิด dialog เมื่อกดปุ่มซื้อ
  };

  const confirmBuy = () => {
    const productToAdd = { ...product, quantity };
    addToCart(productToAdd); // เพิ่มสินค้าในตะกร้า
    setShowDialog(false); // ปิด dialog
    navigate('/cart'); // นำไปยังหน้าตะกร้าสินค้า
  };

  const cancelBuy = () => {
    setShowDialog(false); // ปิด dialog โดยไม่เพิ่มสินค้า
  };

  if (!product) {
    return <div>Loading...</div>;
  }

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
    <div className="product-detail-container">
      <div className="product-detail">
        <img src={product.img} alt={product.name} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.price}</p>
          <div className="quantity-control">
          <button onClick={handleDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrease}>+</button>
          </div>
          <button onClick={handleBuy} className="buy-button">ซื้อ</button>
          <div className="product-description">
            <p>รายละเอียดสินค้า: {product.description}</p>
          </div>
          <div className="product-review">
            <p>รีวิวสินค้า</p>
            <textarea placeholder="แสดงความคิดเห็น..."></textarea>
          </div>
        </div>
      </div>
    </div>
    
                </div>
            </div>
            {/* Dialog ยืนยัน */}
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






