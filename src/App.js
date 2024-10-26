import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/login';
import Main from './page/main'; // นำเข้า Main page
import NavBar from './page/navbar';
import ProductDetail from './page/productDetail'; // หน้ารายละเอียดสินค้า
import { CartProvider } from './page/CartContext';
import Cart from './page/cart';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} /> {/* เส้นทางของหน้า Main */}
        <Route path="/product/:id" element={<ProductDetail />} /> {/* หน้ารายละเอียดสินค้า */}
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
