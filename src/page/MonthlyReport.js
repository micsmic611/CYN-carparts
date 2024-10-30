import React, { useEffect, useState } from 'react';
import './MonthlyReport.css';
import NavBar from './navbar';

function MonthlyReport() {
    const [selectedDay, setSelectedDay] = useState('1'); // ค่าเริ่มต้นเป็นวันที่ 1
    const [selectedMonth, setSelectedMonth] = useState('January'); // ค่าเริ่มต้นเป็นมกราคม
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // ค่าเริ่มต้นเป็นปีปัจจุบัน
    const [reportData, setReportData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        // เรียกใช้ฟังก์ชัน getReportData ทุกครั้งที่มีการเปลี่ยนแปลงวัน เดือน หรือ ปี
        const getReportData = async () => {
          try {
            const response = await fetch(
              `{API_URL}/sales-report?day=${selectedDay}&month=${selectedMonth}&year=${selectedYear}`
            );
            const data = await response.json();
    
            setReportData(data.items); // สมมติว่า API ส่งข้อมูลรายการสินค้าในฟิลด์ items
            setTotalPrice(data.totalPrice); // สมมติว่า API ส่งข้อมูลราคาทั้งหมดในฟิลด์ totalPrice
          } catch (error) {
            console.error('Error fetching report data:', error);
          }
        };
    
    getReportData();
}, [selectedDay, selectedMonth, selectedYear]);

const handleDayChange = (event) => {
  setSelectedDay(event.target.value);
};

const handleMonthChange = (event) => {
  setSelectedMonth(event.target.value);
};

const handleYearChange = (event) => {
  setSelectedYear(event.target.value);
};




  return (
    <div>
    <NavBar />
    <div className="main-container">


        {/* Main content */}
        <div className="main-content">
        <div className="monthly-report">
      <h2>รายงานประจำวัน</h2>
      
      <div className="date-select">
        <label>เลือกวัน:</label>
        <select value={selectedDay} onChange={handleDayChange}>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <label>เลือกเดือน:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        <label>เลือกปี:</label>
        <select value={selectedYear} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>{year}</option>
            );
          })}
        </select>
      </div>

      <div className="report-list">
        {reportData.map((item, index) => (
          <div className="report-item" key={index}>
            <img src={item.img} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>ประเภท: {item.category}</p>
              <p>จำนวน: {item.quantity}</p>
              <p>ราคา: THB {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="total-price">
        รวมทั้งหมด: THB {totalPrice}
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default MonthlyReport;
