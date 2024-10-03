import React, { useState, useEffect, useContext } from "react";
import { Typography, Button, Avatar, Spin, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; 
import { HomeContext } from "../../../Context/HomeContext";
import axios from 'axios';
import "./cashierdetails.css";

const { Title, Text } = Typography;

const CashierDetails = () => {
  const [cashier, setCashier] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(HomeContext);


  const token = JSON.parse(localStorage.getItem('accessToken'));

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
  }, [token]);  


  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    setIsAuthenticated(false);
    // localStorage.removeItem('tokenExpiration');
    console.log("Logging out...");
    navigate('/landing'); 
  };

  const {
    employee_name: name,
    employee_email: email,
    photo_url: photoUrl,
    role,
  } = cashier;

  return (
    <div className="cashier-details-container">
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <div className="cashier-details-content">
          <div className="cashier-info">
            <Title level={3}>{name}</Title>

            <div className="cashier-info-row">
              <Text strong>Email:</Text>
              <Text>{email}</Text>
            </div>
            
            <hr />

            <div className="cashier-info-row">
              <Text strong>Role:</Text>
              <Text>{role}</Text>
            </div>

            <Button type="primary" danger onClick={handleLogout} className="logout-button">
              Logout
            </Button>
          </div>

          <div className="cashier-avatar">
            <Avatar
              size={180}
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
