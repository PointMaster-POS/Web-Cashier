import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Typography, message } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import './logs.css';

const { Title } = Typography;

const Logs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [billCounter, setBillCounter] = useState(1); // Counter for bill numbers
  
  // Get today's date
  const today = new Date().toLocaleDateString();

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

  // Format the bill number as "00001", "00002", etc.
  const formatBillNumber = (billNumber) => {
    return billNumber.toString().padStart(5, '0');
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
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch cashier history');
      }
  
      const data = await response.json();
  
      const formattedData = data.map((item) => ({
        key: item.bill_id,
        billNumber: formatBillNumber(billCounter++), // Use formatted bill number and increment counter
        time: new Date(item.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Show only the time
        totalAmount: item.total_price,
        status: item.status === 1 ? 'Completed' : 'Hold', // Convert status to text
        customerName: item.customer_id || 'Not Assigned', // Handle customer display
      }));
  
      setDataSource(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Error fetching cashier history');
    }
  };

  // Reset the bill counter each day by using the current day as a key
  useEffect(() => {
    const lastReset = localStorage.getItem('lastBillResetDate');
    const todayDate = new Date().toLocaleDateString();

    if (lastReset !== todayDate) {
      setBillCounter(1); // Reset the bill counter
      localStorage.setItem('lastBillResetDate', todayDate); // Store today's date
    }

    fetchData();
  }, []);

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
        Transaction History - {today} {/* Display today's date */}
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
