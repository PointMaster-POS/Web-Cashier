import React, { useState } from "react";
import { Typography, Avatar, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import CashierDetails from "../../Pages/User/CashierDetails";
import "./header.css";

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <CashierDetails/>
      </Modal>
    </div>
  );
};

export default Header;
