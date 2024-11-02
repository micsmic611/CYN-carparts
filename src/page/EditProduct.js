import React, { useState, useEffect } from 'react';
import './EditProduct.css';
import NavBar from './navbar';

const getImagePath = (filename) => {
    try {
        return require(`../img/${filename}`);
    } catch (error) {
        console.error('Image not found:', filename);
        return ''; // ใช้ path ของรูป placeholder กรณีไม่พบรูปภาพ
    }
};

function EditProduct() {
    const [product, setProduct] = useState({
        productId: '',
        productName: '',
        productDescription: '',
        price: '',
        stock: '',
        createdAt: '',
        categoryId: '',
        categoryname: '',
        productImgPath: '',
    });
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        if (savedProduct) {
            setProduct(savedProduct);
        }
    }, []);

    const handleEdit = async () => {
        try {
            const response = await fetch(`https://localhost:7003/api/Product/${product.productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                alert('บันทึกข้อมูลสำเร็จ');
                setShowDialog(false);
            } else {
                alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    const handleDelete = async () => {
        const confirmDelete = window.confirm("คุณต้องการลบสินค้านี้ใช่หรือไม่?");
        if (!confirmDelete) return;
    
        try {
            const response = await fetch(`https://localhost:7003/api/Product/${product.productId}`, { // Updated URL
                method: 'DELETE',
            });
            if (response.ok) {
                alert('ลบสินค้าสำเร็จ');
                setShowDialog(false);
                // Redirect to the main page if needed
            } else {
                alert('เกิดข้อผิดพลาดในการลบสินค้า');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const confirmEdit = () => {
        setShowDialog(true);
    };

    const closeDialog = () => {
        setShowDialog(false);
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
                                {product.productImgPath && (
                                    <img src={getImagePath(product.productImgPath.split('\\').pop())} alt={product.productName} />
                                )}
                                <div className="form-group">
                                    <label>ชื่อสินค้า:</label>
                                    <input
                                        type="text"
                                        value={product.productName}
                                        onChange={(e) => setProduct({ ...product, productName: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ราคา:</label>
                                    <input
                                        type="number"
                                        value={product.price}
                                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ประเภท:</label>
                                    <input
                                        type="text"
                                        value={product.categoryname}
                                        onChange={(e) => setProduct({ ...product, categoryname: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>คำอธิบายสินค้า:</label>
                                    <textarea
                                        value={product.productDescription}
                                        onChange={(e) => setProduct({ ...product, productDescription: e.target.value })}
                                    ></textarea>
                                </div>
                                <div className="button-group">
                                    <button onClick={confirmEdit} className="save-button">แก้ไข</button>
                                    <button onClick={handleDelete} className="delete-button">ลบ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showDialog && (
                <div className="dialog-overlay">
                    <div className="dialog">
                        <p>คุณต้องการยืนยันการแก้ไขหรือไม่?</p>
                        <button onClick={handleEdit} className="confirm-button">ตกลง</button>
                        <button onClick={closeDialog} className="cancel-button">ยกเลิก</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditProduct;