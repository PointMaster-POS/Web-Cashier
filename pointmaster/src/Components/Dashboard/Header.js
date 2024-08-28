import React from "react";
import "./header.css"
import { Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";



const Header = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="header_">
      <Typography.Title level={2} style={{ margin: 0 }}>
        Point Master
      </Typography.Title>
      <Avatar
        icon={<UserOutlined />}
        style={{ cursor: "pointer" }}

        />
    </div>
  );
};

export default Header;
