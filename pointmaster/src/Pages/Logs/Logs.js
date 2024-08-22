import React, { useState } from 'react';
import { Table, Button, Modal, Space, Typography } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import './logs.css';

const { Title } = Typography;

const Logs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

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
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
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

  const dataSource = [
    {
      key: '1',
      billNumber: '001',
      time: '12:00 PM',
      customerName: 'John Doe',
      totalAmount: 150.0,
      discount: 10.0,
      status: 'Completed',
    },
    {
      key: '2',
      billNumber: '002',
      time: '12:30 PM',
      customerName: null,
      totalAmount: 200.0,
      discount: 0.0,
      status: 'Hold',
    },
    // Add more data as needed
  ];

  return (
    <div className="logs-container">
      <Title level={2} className="logs-title">Transaction History</Title>
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
              <p><strong>Discount:</strong> ${selectedBill.discount}</p>
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
