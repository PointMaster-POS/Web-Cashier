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

  return (
    <div className="header">
      <h1>Point Master</h1>
      
    </div>
  );
};

export default Header;
