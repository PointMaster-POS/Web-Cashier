import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Typography, Button, Avatar, Spin, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext'; // Adjust the path based on your project structure
import LogoutButton from './LogoutButton';
import "./cashierdetails.css";

const { Title, Text } = Typography;

const CashierDetails = () => {
  const [cashier, setCashier] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchCashierDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3003/employee'); // Replace with your API endpoint
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
  }, []);

  const { name = "N/A", address = "N/A", dateOfBirth = "N/A", email = "N/A", photoUrl } = cashier;

  return (
    <div className="cashier-details-container">
      {loading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={16}>
          <Col span={16}>
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
            <LogoutButton setIsAuthenticated={setIsAuthenticated} />
          </Col>
          <Col span={8} className="cashier-avatar">
            <Avatar
              size={120}
              src={photoUrl || null}
              icon={<UserOutlined />}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default CashierDetails;
