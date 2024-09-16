import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./landing.css"; 

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Ensure you are just navigating to /login
  };

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/Images/LandingBg.jpg)`, 
      }}
    >
      <div className="overlay">
        <h1 className="title">Revolutionize Your Sales Experience with PointMaster</h1>
        <h2 className="subtitle">
          Streamline Transactions, Enhance Efficiency, and Grow Your Business With Ease
        </h2>
        <Button type="primary" className="login-button" onClick={handleLoginClick}>
          Login as Cashier
        </Button>
      </div>
    </div>
  );
};

export default Landing;
