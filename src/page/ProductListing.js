import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './navbar';
import './ProductListing.css';

function ProductListing() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from db.json
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Navigate to EditProduct page with the product ID
    const handleEdit = (productId) => {
        navigate(`/editproduct`);
    };

    return (<div>
        <NavBar />
        <div className="product-listing-container">
            <h2>รายการสินค้า</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div 
                        key={product.id} 
                        className="product-card" 
                        onClick={() => handleEdit(product.id)}
                    >
                        <img src={product.img} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>ราคา: THB {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default ProductListing;
