import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './navbar';
import './ProductListing.css';

const getImagePath = (filename) => {
    return require(`../img/${filename}`); // ตรวจสอบให้แน่ใจว่าใช้ path ที่ถูกต้อง
};

function ProductListing() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from the API
        fetch('https://localhost:7003/api/Product/ProductsWithCategory')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Navigate to EditProduct page and save product data in local storage
    const handleEdit = (product) => {
        localStorage.setItem('selectedProduct', JSON.stringify(product)); // Save selected product to local storage
        navigate(`/editproduct/`);
    };

    return (
        <div>
            <NavBar />
            <div className="product-listing-container">
                <h2>รายการสินค้า</h2>
                <div className="product-list">
                    {products.map((product) => (
                        <div 
                            key={product.productId} 
                            className="product-card" 
                            onClick={() => handleEdit(product)}
                        >
                            <img src={getImagePath(product.productImgPath.split('\\').pop())} alt={product.productName} />
                            <h3>{product.productName}</h3>
                            <p>ราคา: THB {product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductListing;
