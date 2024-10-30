import React, { useState } from 'react';
import './EditProduct.css';
import NavBar from './navbar';
function EditProduct({ product, onSave, onCancel }) {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [category, setCategory] = useState(product?.category || '');
  const [description, setDescription] = useState(product?.description || '');
  const [image, setImage] = useState(product?.img || '');

  const handleSave = () => {
    // สร้างข้อมูลสินค้าที่อัปเดตแล้ว
    const updatedProduct = {
      ...product,
      name,
      price,
      category,
      description,
      img: image,
    };
    onSave(updatedProduct);
  };

  return (
    <div>
    <NavBar />
    <div className="main-container">


        {/* Main content */}
        <div className="main-content">
  <div className="edit-product-modal">
      <div className="edit-product-content">
        <h2>แก้ไขสินค้า</h2>

        <div className="edit-product-form">
          <div className="image-upload">
            <img src={image} alt="Product" />
            <input
              type="file"
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            />
            <p>สามารถแก้ไขรูปได้โดยการอัปโหลด</p>
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
            <button onClick={handleSave} className="save-button">ตกลง</button>
            <button onClick={onCancel} className="cancel-button">ยกเลิก</button>
          </div>
        </div>
      </div>
    </div>
        </div>
    </div>
</div>
);
  


}

export default EditProduct;
