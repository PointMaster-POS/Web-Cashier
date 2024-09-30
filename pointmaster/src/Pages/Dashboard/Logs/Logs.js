import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Space, Typography, message } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import './logs.css';

const { Title } = Typography;

const Logs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [billCounter, setBillCounter] = useState(1);

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
    console.log('Printing bill:', bill);
  };

  const formatBillNumber = (billNumber) => {
    return billNumber.toString().padStart(5, '0');
  };

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem('accessToken'));

    if (!token) {
      message.error('Token not found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3003/cashier/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to fetch cashier history: ${errorDetails}`);
      }

      const data = await response.json();

      const formattedData = data.map((item, index) => ({
        key: item.bill_id,
        billNumber: formatBillNumber(billCounter + index),
        time: new Date(item.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        totalAmount: item.total_price,
        status: item.status === 1 ? 'Completed' : 'Hold',
        customerPhone: item.customer_phone || 'Not Assigned',
        discount: item.discount || 0,  
        received: item.received || item.total_price, 
        items: item.items || [], 
        paymentMethod: item.payment_method,
        notes: item.notes || 'None',
      }));

      setDataSource(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      message.error(`Error fetching cashier history: ${error.message}`);
    }
  };

  useEffect(() => {
    const lastReset = localStorage.getItem('lastBillResetDate');
    const todayDate = new Date().toLocaleDateString();

    if (lastReset !== todayDate) {
      setBillCounter(1);
      localStorage.setItem('lastBillResetDate', todayDate);
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
      title: 'Customer Phone',
      dataIndex: 'customerPhone',
      key: 'customerPhone',
      render: (text) => text || 'Not Assigned',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Received Amount',
      dataIndex: 'received',
      key: 'received',
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
          <Button
            type="primary"
            style={{ backgroundColor: record.status === 'Completed' ? 'green' : 'orange' }}
            onClick={() => showModal(record)}
          >
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
        Transaction History - {today}
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
              <h3>Items Purchased:</h3>
              {selectedBill.items.map((item, idx) => (
                <div key={idx}>
                  <p>
                    <strong>{item.item_name}</strong> - {item.supplier_name}
                  </p>
                  <p>
                    Unit Price: ${item.price.toFixed(2)}, Quantity: {item.quantity}, 
                    Discount: ${item.discount || 0}
                  </p>
                </div>
              ))}
              <hr />
              <p><strong>Total Amount:</strong> ${selectedBill.totalAmount.toFixed(2)}</p>
              <p><strong>Discount:</strong> ${selectedBill.discount.toFixed(2)}</p>
              <p><strong>Received:</strong> ${selectedBill.received.toFixed(2)}</p>
              <p><strong>Payment Method:</strong> {selectedBill.paymentMethod}</p>
              <p><strong>Notes:</strong> {selectedBill.notes}</p>
            </div>
          )}
        </Modal>
        
      </div>
    </div>
  );
};

export default Logs;
