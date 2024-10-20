import React, {useContext, useEffect} from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./landing.css"; 
import { HomeContext } from '../../Context/HomeContext';

const Landing = () => {
  
  const navigate = useNavigate();
  const { isAuthenticated , setIsAuthenticated} = useContext(HomeContext);

  const handleCheckToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (accessToken) {
      const currentTime = Date.now();
      if (currentTime < tokenExpiration) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpiration");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }

  

  const handleLoginClick = () => {
    handleCheckToken();
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {

      navigate("/dashboard");
    }
    else {
      navigate("/login");
    }
    
    navigate("/login"); 
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/Images/LandingBg.jpg)`, 
      }}
    >
      <div className="full-overlay">
        <div className="overlay">
          <h1 className="title">Revolutionize Your Sales Experience with PointMaster</h1>
          <h2 className="subtitle">
            Streamline Transactions, Enhance Efficency, and Grow Your Business With Ease
          </h2>
          <Button type="primary" className="login-button" onClick={handleLoginClick}>
            Login as Cashier
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
