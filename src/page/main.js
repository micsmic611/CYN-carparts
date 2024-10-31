import React, { useEffect, useState } from 'react';
import './main.css';
import NavBar from './navbar';
import { Link } from 'react-router-dom';

const getImagePath = (filename) => {
    return require(`../img/${filename}`); // ตรวจสอบให้แน่ใจว่าใช้ path ที่ถูกต้อง
};

function Main() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const productsPerPage = 6;

    useEffect(() => {
        fetch('https://localhost:7003/api/Product/ProductsWithCategory')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched products:', data);
                setProducts(data);
                setSearchResults(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filteredProducts = searchResults.filter(product => {
        const productName = product.productName || ''; 
        const matchesSearchTerm = productName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.some(category => 
                product.productDescription?.includes(category) 
            );

        return matchesSearchTerm && matchesCategory;
    });

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
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
        setCurrentPage(1);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(c => c !== category)
                : [...prevCategories, category]
        );
    };

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
                            onChange={() => handleCategoryChange('กันชนหน้า')}
                        />
                        <label htmlFor="frontBumper">กันชนหน้า</label>
                    </div>
                    <div className="category">
                        <input
                            type="checkbox"
                            id="backBumper"
                            onChange={() => handleCategoryChange('กันชนหลัง')}
                        />
                        <label htmlFor="backBumper">กันชนหลัง</label>
                    </div>
                    <div className="category">
                        <input
                            type="checkbox"
                            id="backLight"
                            onChange={() => handleCategoryChange('ไฟหน้าหลัง')}
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            <img src="/search.png" alt="search" />
                        </button>
                        <Link to="/history" className="list-button">
                            <img src="/list.png" alt="list" />
                        </Link>
                        <Link to="/cart" className="cart-button">
                            <img src="/shopping-cart.png" alt="cart" />
                        </Link>
                    </div>

                    <div className="product-grid">
                        {currentProducts.map((product) => (
                            <Link to={`/product/${product.productId}`} key={product.productId} className="product-card">
                            <img src={getImagePath(product.productImgPath.split('\\').pop())} alt={product.productName} />
                            <p>ชื่อสินค้า {product.productName}</p>
                            <p>ราคา {product.price} บาท</p>
                            <p>คลัง {product.stock} ชิ้น</p>
                            <p>รายละเอียดสินค้า {product.productDescription}</p>
                            <p>ประเภท {product.categoryname}</p>
                        </Link>
                        ))}
                    </div>

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
