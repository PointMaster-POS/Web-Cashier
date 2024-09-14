import React from "react";
import { Row, Col, Typography, Button, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./cashierdetails.css"; 

const { Title, Text } = Typography;

const CashierDetails = ({ cashier = {} }) => {
  const handleLogout = () => {
    // Implement logout 
    console.log("Logging out...");
  };

  // Destructure cashier object with default values
  const { name = "N/A", address = "N/A", dateOfBirth = "N/A", email = "N/A", photoUrl } = cashier;

  return (
    <div className="cashier-details-container">
      <Row gutter={16}>
        {/* Left Side - Cashier Details */}
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
          <Button type="primary" danger onClick={handleLogout} style={{ marginTop: "20px" }}>
            Logout
          </Button>
        </Col>

        {/* Right Side - Cashier Image */}
        <Col span={8} className="cashier-avatar">
          <Avatar
            size={120}
            src={photoUrl || null} // Display profile image if available
            icon={<UserOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CashierDetails;
