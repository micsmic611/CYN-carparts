import React, { useState } from 'react';
import './EditProduct.css';
import NavBar from './navbar';

function EditProduct({ product, onSave, onCancel, onDelete }) {
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price || '');
    const [category, setCategory] = useState(product?.category || '');
    const [description, setDescription] = useState(product?.description || '');
    const [image, setImage] = useState(product?.img || '');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setLoading(true);
        const updatedProduct = {
            ...product,
            name,
            price,
            category,
            description,
            img: image,
        };

        try {
            const response = await fetch(`{API_URL}/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            const data = await response.json();
            onSave(data);
            alert('บันทึกการแก้ไขสำเร็จ');
        } catch (error) {
            console.error('Error updating product:', error);
            alert('การอัปเดตข้อมูลสินค้าล้มเหลว');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("คุณต้องการลบสินค้านี้ใช่หรือไม่?");
        if (!confirmDelete) return;

        try {
            setLoading(true);
            const response = await fetch(`{API_URL}/products/${product.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            onDelete(product.id); // ส่ง id ของสินค้าที่ถูกลบไปยังฟังก์ชัน onDelete
            alert('ลบสินค้าสำเร็จ!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('การลบสินค้าล้มเหลว');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="main-container">
                <div className="main-content">
                    <div className="edit-product-modal">
                        <div className="edit-product-content">
                            <h2>แก้ไขสินค้า</h2>
                            <div className="edit-product-form">
                                <div className="image-upload">
                                    <label htmlFor="imageInput">
                                        {image ? (
                                            <img src={image} alt="Product" />
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
                                    <button
                                        onClick={handleSave}
                                        className="save-button"
                                        disabled={loading}
                                    >
                                        {loading ? 'กำลังบันทึก...' : 'ตกลง'}
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="delete-button"
                                        disabled={loading}
                                    >
                                        ลบ
                                    </button>
                                    <button
                                        onClick={onCancel}
                                        className="cancel-button"
                                    >
                                        ยกเลิก
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

export default EditProduct;
