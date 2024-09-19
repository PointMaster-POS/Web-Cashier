

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Typography, message } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import './logs.css';

const { Title } = Typography;

const Logs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  
  const showModal = (bill) => {
    setSelectedBill(bill);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePrint = (bill) => {
    // Implement print logic here
    console.log('Printing bill:', bill);
  };

  

  const fetchData = async () => {
  const token = JSON.parse(localStorage.getItem('accessToken')); // Parse the token from localStorage

  if (!token) {
    message.error('Token not found. Please log in.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3003/cashier/history', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cashier history');
    }

    const data = await response.json();

    const formattedData = data.map((item) => ({
      key: item.bill_id,
      billNumber: item.bill_id,
      time: new Date(item.date_time).toLocaleString(), // Format date and time
      totalAmount: item.total_price,
      status: item.status === 1 ? 'Completed' : 'Hold', // Convert status to text
      customerName: item.customer_id || 'Not Assigned', // Customer name handling
    }));

    setDataSource(formattedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    message.error('Error fetching cashier history');
  }
};


  const columns = [
    {
      title: 'Bill Number',
      dataIndex: 'billNumber',
      key: 'billNumber',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text) => text || 'Not Assigned',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'Completed' ? 'green' : 'orange' }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<PrinterOutlined />} onClick={() => handlePrint(record)}>
            Print
          </Button>
          <Button type="primary" onClick={() => showModal(record)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="logs-container">
      <Title
        level={2}
        style={{
          textAlign: 'left',
          marginBottom: '16px',
          color: '#1a3d7c',
          fontWeight: 'bold',
          fontSize: '38px',
        }}
      >
        Transaction History
      </Title>
      <hr className="divider" />

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />

        <Modal
          title="Bill Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {selectedBill && (
            <div>
              <p><strong>Bill Number:</strong> {selectedBill.billNumber}</p>
              <p><strong>Time:</strong> {selectedBill.time}</p>
              <p><strong>Customer Name:</strong> {selectedBill.customerName || 'Not Assigned'}</p>
              <p><strong>Total Amount:</strong> ${selectedBill.totalAmount}</p>
              <p><strong>Status:</strong> {selectedBill.status}</p>
              {/* Display more details as required */}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Logs;

