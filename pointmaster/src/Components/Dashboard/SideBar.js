import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  DashboardOutlined,
  ShopOutlined,
  PhoneOutlined,
  AppstoreOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  AreaChartOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

const { Sider } = Layout;

const items = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/stores",
    icon: <ShopOutlined />,
    label: "Stores",
  },
  {
    key: "/users",
    icon: <UserOutlined />,
    label: "Users",
  },
  {
    key: "/suppliers",
    icon: <PhoneOutlined />,
    label: "Suppliers",
  },
  { key: "/category", icon: <AppstoreOutlined />, label: "Category" },
  { key: "/products", icon: <ProductOutlined />, label: "Products" },
  { key: "/orders", icon: <ShoppingCartOutlined />, label: "Orders" },
  { key: "/reports", icon: <AreaChartOutlined />, label: "Reports" },
  { key: "/expired", icon: <StopOutlined />, label: "Expired" },
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
      width={260}
      onCollapse={handleCollapse}
      theme="light"
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 75,
        bottom: 0,
      }}
    >
      {/* <div className="logo-container">
        <img src="images/WhatsApp Image 2024-07-15 at 22.03.59_603d8715.jpg" alt="Logo" className="logo" />
      </div> */}

      <Menu
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        theme="light"
        onClick={onMenuClick}
        className="custom-menu"
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            className="custom-menu-item"
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
