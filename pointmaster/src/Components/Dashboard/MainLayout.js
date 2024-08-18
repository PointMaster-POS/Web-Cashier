import React, { useState } from "react";
import { Layout } from "antd";
import Header from "./Header";
import Content from "./Content";
import SideBar from "./SideBar";


// import Footer from "../Footer/Footer";

const { Content: AntContent } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        <Header />
      </div>
      <Layout>
        <SideBar onCollapse={handleCollapse} />
        <Layout
          style={{
            marginLeft: collapsed ? "80px" : "120px", 
            transition: "margin-left 0.2s",
          }}
        >
          <AntContent style={{ margin: "8px 8px 0", height: '100%' }}>
            <Content />
          </AntContent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
