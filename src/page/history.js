import React from "react";
import './history.css';

const products = [
    {
      id: 1,
      name: 'กันชนหน้า LH137 TY',
      description: 'ประเภท: กันชนหน้า',
      price: 'THB 990',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'กันชนหน้า LH137 TY',
      description: 'ประเภท: กันชนหน้า',
      price: 'THB 990',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'กันชนหน้า LH137 TY',
      description: 'ประเภท: กันชนหน้า',
      price: 'THB 990',
      image: 'https://via.placeholder.com/150'
    }
  ];

function History() {
    return (
        <div className="product-list-container">
          <header className="product-list-header">
            <h1>CYN Carpart</h1>
          </header>
    
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                </div>
                <p className="product-price">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      );
}

export default History;