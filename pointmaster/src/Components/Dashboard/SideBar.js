import React, { useState, useEffect } from "react";
import { 
  HomeOutlined, 
  UserOutlined, 
  HistoryOutlined 
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

const { Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "/user",
    icon: <UserOutlined />,
    label: "User",
  },
  {
    key: "/logs",
    icon: <HistoryOutlined />,
    label: "Logs",
  },
];

const SideBar = ({ onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const onMenuClick = (e) => {
    setSelectedKey(e.key);
    navigate(e.key);
  };

  const handleCollapse = (value) => {
    setCollapsed(value);
    onCollapse(value);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={120} // Increased width for better spacing
      onCollapse={handleCollapse}
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 75,
        bottom: 0,
      }}
    >
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        theme="light"
        onClick={onMenuClick}
        style={{ paddingTop: 20 }} // Adds space at the top
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            style={{ marginBottom: 40 }} // Space between items
          >
            <span>{item.label}</span>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
