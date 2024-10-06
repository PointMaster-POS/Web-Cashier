

import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal, Space, Typography, message } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import html2pdf from 'html2pdf.js';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './logs.css';
import { HomeContext } from '../../../Context/HomeContext';
import baseUrl from '../../../apiConfig';


const { Title } = Typography;

const Logs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [billCounter, setBillCounter] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const { updateHoldBillData } = useContext(HomeContext); 
  const navigate = useNavigate(); 

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

  const handlePrint = () => {
    const element = document.getElementById('bill-details');
    const opt = {
      margin: 0.5,
      filename: `bill_${selectedBill.billNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().from(element).set(opt).save();
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
      const response = await fetch(`${baseUrl}:3003/cashier/history`, {
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

      setDataSource(formattedData.reverse());
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

  const navigateToReloadPage = (bill) => {
    console.log(bill);
    // Use the correct function name from context
    updateHoldBillData(bill); 
    
    // Navigate to the dashboard, passing the bill object as state
    navigate(`/dashboard`, { state: { bill } });
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
        <span style={{ color: status === 'Completed' ? '#002465' : '#FD9404' }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          {record.status === 'Completed' ? (
            <Button
              type="primary"
              style={{
                backgroundColor: '#002465',
                borderColor: '#002465',
              }}
              onClick={() => showModal(record)}
            >
              View Details
            </Button>
          ) : (
            <Button
              type="default"
              style={{ backgroundColor: '#FD9404', borderColor: '#FD9404', color: 'white' }}
              onClick={() => navigateToReloadPage(record)}
            >
              Reload Data
            </Button>
          )}
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
          marginLeft: '20px',
        }}
      >
        Transaction History - {today}
      </Title>
      <hr className="divider" />

      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
        <Table columns={columns} 
               dataSource={dataSource} 
               pagination={{ pageSize: 13, current: currentPage, onChange: (page) => setCurrentPage(page) }} />

        <Modal
          title="Bill Details"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={500}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Close
            </Button>,
            <Button className="print-btn" key="print" type="primary" icon={<PrinterOutlined />} onClick={handlePrint}>
              Print PDF
            </Button>,
          ]}
        >
          {selectedBill && (
            <div id="bill-details">
              <h3>Items Purchased:</h3>
              {selectedBill.items.map((item, idx) => (
                <div key={idx}>
                  <div class="item-details">
                    <div class="item-header">
                      <strong>{item.item_name}</strong> 
                      <span class="supplier-name">{/*- {item.supplier_name}*/}</span>
                    </div>
                    <div class="item-info">
                      <div class="info-row">
                        <span>Unit Price:</span>
                        <span class="value">${item.price.toFixed(2)}</span>
                      </div>
                      <div class="info-row">
                        <span>Quantity:</span>
                        <span class="value">{item.quantity}</span>
                      </div>
                      <div class="info-row">
                        <span>Discount:</span>
                        <span class="value">${item.discount || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
              <div class="bill-details">
                <div className="info-item"><strong>Total Amount:</strong> ${selectedBill.totalAmount.toFixed(2)}</div>
                <div className="info-item"><strong>Discount:</strong> ${selectedBill.discount.toFixed(2)}</div>
                <div className="info-item"><strong>Received:</strong> ${selectedBill.received.toFixed(2)}</div>
                <div className="info-item"><strong>Payment Method:</strong> {selectedBill.paymentMethod}</div>
                <div className="info-item"><strong>Notes:</strong> {selectedBill.notes}</div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Logs;

