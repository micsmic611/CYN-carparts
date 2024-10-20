import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/login';
import Main from './page/main'; // นำเข้า Main page
import NavBar from './page/navbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} /> {/* เส้นทางของหน้า Main */}
        <Route path="/navbar" element={<NavBar />} />
      </Routes>
    </Router>
  );
}

export default App;
