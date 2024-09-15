import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import SideBar from './SideBar';
import CashierRoutes from '../../Pages/CashierRoutes'; // Import CashierRoutes

const { Content: AntContent } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <Header />
      </div>
      <Layout>
        <SideBar />
        <Layout style={{ marginLeft: '120px' }}>
          <AntContent style={{ margin: '8px 8px 0', height: '100%' }}>
            <div className="content">
              <CashierRoutes /> {/* Render CashierRoutes here */}
            </div>
          </AntContent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
