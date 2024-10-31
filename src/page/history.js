import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import './history.css';

function History() {
    const [history, setHistory] = useState([]); // State to store payment history
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the JWT token from local storage
                if (!token) throw new Error("No token found");

                const decodedToken = jwtDecode(token); // Decode the token to get user ID
                const userId = decodedToken.userId; // Adjust based on your token structure

                const response = await axios.get(`https://localhost:7003/api/Payment/history/${userId}`);
                setHistory(response.data); // Assuming the response contains the payment history
                setLoading(false); // Set loading to false
            } catch (err) {
                console.error("Error fetching payment history:", err);
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };

        fetchPaymentHistory();
    }, []); // Empty dependency array to run once on mount

    if (loading) return <div>Loading...</div>; // Show loading state
    if (error) return <div>Error: {error}</div>; // Show error message

    return (
        <div className="history-page">
            <div className="product-list-container">
                <header className="product-list-header">
                    <h1>CYN Carpart</h1>
                </header>

                <div className="product-list">
                    {history.length > 0 ? (
                        history.map((payment) => ( // Map through the payment history
                            <div key={payment.buyId} className="product-item">
                                <img src="https://via.placeholder.com/150" alt={payment.productName} className="product-image" />
                                <div className="product-details">
                                    <h3 className="product-name">{payment.productName}</h3>
                                    <p className="product-description">เลขที่ใบสั่งซื้อ: {payment.buyId}</p>
                                    <p className="product-description">วันที่ชำระเงิน: {new Date(payment.purchaseDate).toLocaleString()}</p> {/* Convert date */}
                                    <p className="product-description">สถานะการส่ง: {payment.send_status}</p>
                                    <p className="product-price">ยอดรวม: ฿{payment.totalPrice}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No payment history found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default History;
