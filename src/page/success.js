import React from "react";
import { useNavigate } from "react-router-dom";
import './success.css';

function Success(){
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/main');
    };
    return (
        <div className="thank-you-container">
            <div className="thank-you-card">
                <div className="check-icon">
                    <img src="/check-icon.png" alt="Success" /> {/* แสดงไอคอนติ๊กถูก */}
                </div>
                <p>Thank you for order</p>
                <button className="home-button" onClick={handleHomeClick}>Home</button>
            </div>
        </div>
    );
}
export default Success;