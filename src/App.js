import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/login';
import Main from './page/main'; // นำเข้า Main page
import NavBar from './page/navbar';
import History from './page/history';
import Payment from './page/payment';
import Success from './page/success';
import CustomerList from './page/customer';
import ProfileForm from './page/editprofile';
import Manager from './page/manager';
import ProductDetail from './page/productDetail'; // หน้ารายละเอียดสินค้า
import { CartProvider } from './page/CartContext';
import Cart from './page/cart';
import EditProduct from './page/EditProduct';
import AddProduct from './page/AddProduct';
import MonthlyReport from './page/MonthlyReport';
import ProductListing from './page/ProductListing';
import Register from './page/Register';
import ResetPassword from './page/ResetPassword'; 

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
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/product/:id" element={<ProductDetail />} /> 
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/EditProduct" element={<EditProduct />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/MonthlyReport" element={<MonthlyReport />} />
        <Route path="/ProductListing" element={<ProductListing />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;