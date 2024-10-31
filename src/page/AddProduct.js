import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import NavBar from './navbar';

function AddProduct({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://localhost:7003/api/Category/GetAllcategoryId');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddProduct = async () => {
    setLoading(true);
    
    const formData = new FormData();
    formData.append('ProductName', name);
    formData.append('ProductDescription', description);
    formData.append('Price', price);
    formData.append('Stock', stock);
    formData.append('CategoryId', category);
    formData.append('ProductImgPath', ''); // Optional, depending on backend handling
    if (image) {
      formData.append('productImage', image);
    }

    // Log the formData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch('https://localhost:7003/api/Product/add', {
        method: 'POST',
        body: formData,
        headers: {
          'accept': '*/*',
        },
      });
    
      const data = await response.json();
    
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add product');
      }
    
      // ตรวจสอบว่า onAdd เป็นฟังก์ชันหรือไม่
      if (typeof onAdd === 'function') {
        onAdd(data);
      } else {
        console.warn('onAdd is not a function');
      }
    
      alert('เพิ่มสินค้าสำเร็จ!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('การเพิ่มสินค้าล้มเหลว: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="main-container">
        <div className="main-content">
          <div className="add-product-modal">
            <div className="add-product-content">
              <h2>เพิ่มสินค้า</h2>

              <div className="add-product-form">
                <div className="image-upload">
                  <label htmlFor="imageInput">
                    {image ? (
                      <img src={URL.createObjectURL(image)} alt="Product" />
                    ) : (
                      <div className="placeholder">+ เพิ่มรูปภาพ</div>
                    )}
                  </label>
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </div>

                <div className="form-group">
                  <label>ชื่อสินค้า:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>ราคา:</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>จำนวนในสต็อก:</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>ประเภท:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">เลือกประเภท</option>
                    {categories.map((cat) => (
                      <option key={cat.categoryId} value={cat.categoryId}>
                        {cat.categoryname}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>คำอธิบายสินค้า:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="button-group">
                  <button onClick={handleAddProduct} className="add-button" disabled={loading}>
                    {loading ? 'กำลังเพิ่ม...' : 'เพิ่ม'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
