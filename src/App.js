import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/login';
import Main from './page/main'; // นำเข้า Main page
import NavBar from './page/navbar';
import History from './page/history';
import Payment from './page/payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} /> {/* เส้นทางของหน้า Main */}
        <Route path="/navbar" element={<NavBar />} />
        <Route path="/history" element={<History />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
