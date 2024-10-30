import React, { useState } from 'react';
import './AddProduct.css';
import NavBar from './navbar';

function AddProduct({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddProduct = async () => {
    setLoading(true);
    
    // สร้างข้อมูลสำหรับการส่งไปยัง API
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      // แทนที่ {API_URL} ด้วย URL ของ API ที่ใช้
      const response = await fetch('{API_URL}/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      onAdd(data); // ส่งข้อมูลสินค้าใหม่กลับไปยังฟังก์ชัน onAdd
      alert('เพิ่มสินค้าสำเร็จ!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('การเพิ่มสินค้าล้มเหลว');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div>
    <NavBar />
    <div className="main-container">


        {/* Main content */}
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
            <label>ประเภท:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
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
