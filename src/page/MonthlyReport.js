import React, { useEffect, useState } from 'react';
import './MonthlyReport.css';
import NavBar from './navbar';

function MonthlyReport() {
    const [reportData, setReportData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // ตั้งเดือนเริ่มต้นเป็นเดือนปัจจุบัน
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const getReportData = async () => {
            try {
                const response = await fetch(`https://localhost:7003/api/Payment/history?month=${selectedMonth}`);
                const data = await response.json();
                setReportData(data);

                // คำนวณราคารวม
                const total = data.reduce((acc, item) => acc + item.totalPrice, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        getReportData();
    }, [selectedMonth]);

    // คำนวณข้อมูลที่จะแสดงในแต่ละหน้า
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(reportData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(Number(e.target.value));
        setCurrentPage(1); // รีเซ็ตไปที่หน้าแรกเมื่อเปลี่ยนเดือน
    };

    return (
        <div>
            <NavBar />
            <div className="main-container">
                <div className="main-content">
                    <div className="monthly-report">
                        <h2>รายงานประจำวัน</h2>
                        <div className="date-select">
                            <label htmlFor="monthSelect">เลือกเดือน:</label>
                            <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
                                <option value="1">มกราคม</option>
                                <option value="2">กุมภาพันธ์</option>
                                <option value="3">มีนาคม</option>
                                <option value="4">เมษายน</option>
                                <option value="5">พฤษภาคม</option>
                                <option value="6">มิถุนายน</option>
                                <option value="7">กรกฎาคม</option>
                                <option value="8">สิงหาคม</option>
                                <option value="9">กันยายน</option>
                                <option value="10">ตุลาคม</option>
                                <option value="11">พฤศจิกายน</option>
                                <option value="12">ธันวาคม</option>
                            </select>
                        </div>
                        
                        <div className="report-list">
                            {currentItems.map((item) => (
                                <div className="report-item" key={item.buyId}>
                                    <img src="/profile-user.png" alt={item.productName} />
                                    <div className="item-details">
                                        <h3>{item.productName}</h3>
                                        <p>จำนวน: {item.quantity}</p>
                                        <p>ราคา: THB {item.totalPrice}</p>
                                        <p>สถานะการชำระเงิน: {item.paymentStatus}</p>
                                        <p>วันที่ซื้อ: {new Date(item.purchaseDate).toLocaleString()}</p>
                                        <p>สถานะการส่ง: {item.send_status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* แสดงจำนวนรายการทั้งหมด */}
                        <div className="total-count">
                            จำนวนรายการทั้งหมด: {reportData.length} รายการ
                        </div>

                        {/* Pagination */}
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MonthlyReport;
