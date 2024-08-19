import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Content from './Content';
import SideBar from './SideBar';
import RightContent from '../../Pages/Home/RightContent';
import LeftContent from '../../Pages/Home/LeftContent';

const { Content: AntContent } = Layout;

const MainLayout = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

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
              <LeftContent onAddItem={handleAddItem} />
              <RightContent selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
            </div>
          </AntContent>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
