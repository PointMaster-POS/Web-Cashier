import React, { useState } from "react";
import { Typography, Avatar, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import CashierDetails from "../../Pages/User/CashierDetails";
import "./header.css";

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Sample cashier data (make sure this is defined)
  const cashier = {
    name: "John Doe",
    address: "123 Main St, Springfield",
    dateOfBirth: "1990-05-12",
    email: "john.doe@example.com",
    photoUrl: "", // Optional: add an image URL
  };

  const handleProfileClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="header_">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Point Master
      </Typography.Title>
      <Avatar
        icon={<UserOutlined />}
        size={48}
        style={{ cursor: "pointer", marginRight: "20px" }} // Combine styles into one object
        onClick={handleProfileClick}
      />

      {/* Modal for displaying CashierDetails */}
      <Modal
        title="Cashier Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <CashierDetails cashier={cashier} />
      </Modal>
    </div>
  );
};

export default Header;
