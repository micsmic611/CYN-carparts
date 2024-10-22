import React, { useEffect, useState } from 'react';
import './main.css';
import NavBar from './navbar';

function Main() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]); // state สำหรับเก็บหมวดหมู่ที่เลือก
    const productsPerPage = 6;

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

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
                        <div className="icon-container">
                            <i className="fa fa-user"></i>
                            <i className="fa fa-shopping-cart"></i>
                            <i className="fa fa-home"></i>
                        </div>
                    </div>

                    {/* Product grid */}
                    <div className="product-grid">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product) => (
                                <div key={product.id} className="product-card">
                                    <img src={product.img} alt={product.name} />
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                    <p>{product.description}</p>
                                </div>
                            ))
                        ) : (
                            <p>ไม่พบสินค้าที่ตรงกับการค้นหา</p>
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredProducts.length > 0 && (
                        <div className="pagination">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                                หน้าก่อนหน้า
                            </button>
                            <span>
                                หน้าที่ {currentPage} จาก {totalPages}
                            </span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                หน้าถัดไป
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Main;
