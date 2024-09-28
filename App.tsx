import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';  // นำเข้าไฟล์ Login.tsx
import Main from './main/main';  // นำเข้าไฟล์ Dashboard.tsx

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />  {/* เส้นทางสำหรับหน้า Login */}
          <Route path="/main" element={<Main />} />  {/* เส้นทางสำหรับหน้า main */}
        </Routes>
      </Router>
    );
  }
  
  export default App;
