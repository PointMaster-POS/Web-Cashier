// LandingPage.js
import React from "react";
import { Button } from "antd";
import "./landing.css";

const Landing = () => {
  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/Images/LandingBg.jpg)`, // Use the image from the public folder
      }}
    >
      <div className="overlay">
        <h1 className="title">Revolutionize Your Sales Experience with PointMaster</h1>
        <h2 className="subtitle">
          Streamline Transactions, Enhance Efficiency, and Grow Your Business With Ease
        </h2>
        <Button type="primary" className="login-button">
          Login as Admin
        </Button>
      </div>
    </div>
  );
};

export default Landing;
