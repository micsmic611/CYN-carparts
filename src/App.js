import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/login';
import Main from './page/main'; // นำเข้า Main page
import NavBar from './page/navbar';
import History from './page/history';
import Payment from './page/payment';
import Success from './page/success';
import ProductDetail from './page/productDetail'; // หน้ารายละเอียดสินค้า
import { CartProvider } from './page/CartContext';
import Cart from './page/cart';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} /> 
        <Route path="/history" element={<History />} /> 
        <Route path="/payment" element={<Payment />} /> 
        <Route path="/success" element={<Success />} /> 
        <Route path="/product/:id" element={<ProductDetail />} /> 
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;