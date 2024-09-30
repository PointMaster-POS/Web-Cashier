import React, { useState, useEffect, useContext } from "react";
import { Typography, Button, Avatar, Spin, notification } from "antd";
import { FontColorsOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; 
import { HomeContext } from "../../../Context/HomeContext";
import axios from 'axios';
import "./cashierdetails.css";

const { Title, Text } = Typography;

const CashierDetails = () => {
  const [cashier, setCashier] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated,setIsAuthenticated } = useContext(HomeContext);


  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCashierDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3003/employee', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Cashier details:', response.data);
        setCashier(response.data);
      } catch (error) {
        console.error('Error fetching cashier details:', error);
        notification.error({
          message: 'Error',
          description: 'Failed to load cashier details.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCashierDetails();
  }, [token]);  // Add token as a dependency if it comes from state or props


  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    setIsAuthenticated(false);
    // localStorage.removeItem('tokenExpiration');
    console.log("Logging out...");
    navigate('/landing'); 
  };

  const { name = "N/A", address = "N/A", dateOfBirth = "N/A", email = "N/A", photoUrl } = cashier;

  return (
    <div className="cashier-details-container">
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="cashier-details-content">
          <div className="cashier-info">
            <Title level={4}>{name}</Title>
            <Text strong>Address:</Text>
            <Text>{address}</Text>
            <br />
            <Text strong>Date of Birth:</Text>
            <Text>{dateOfBirth}</Text>
            <br />
            <Text strong>Email:</Text>
            <Text>{email}</Text>
            <br />
            <Button type="primary" danger onClick={handleLogout} className="logout-button">
              Logout
            </Button>
          </div>
          <div className="cashier-avatar">
            <Avatar
              size={120}
              src={photoUrl || null}
              icon={<UserOutlined />}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CashierDetails;
