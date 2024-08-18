import React from "react";
import { Space, Typography, Avatar, Popover, List } from "antd";
import { BellFilled, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./header.css"

const notifications = [
  { title: "New Order", description: "You have a new order." },
  { title: "Payment Received", description: "Payment has been received." },
  { title: "New Message", description: "You have a new message." },
  { title: "Inventory Alert", description: "Low stock on item #1234." },
  { title: "System Update", description: "System will be updated at midnight." },
  { title: "Customer Feedback", description: "New feedback received." },
  { title: "New Subscriber", description: "You have a new subscriber." },
  { title: "Bug Report", description: "A bug report has been filed." }
];
const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const notificationContent = (
    <List
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.title} description={item.description} />
        </List.Item>
      )}
    />
  );

  return (
    <div className="header">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Welcome to Point Master
      </Typography.Title>
      <Space size="large" /* style={{ marginLeft: 'auto' }} */>
        <Popover content={notificationContent} title="Notifications" trigger="click">
          <BellFilled style={{ fontSize: 30, cursor: "pointer", marginLeft: 10}} />
        </Popover>
        <Avatar
          icon={<UserOutlined />}
          style={{ cursor: "pointer" }}
          onClick={handleProfileClick}
        />
      </Space>
    </div>
  );
};

export default Header;
