import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Spin } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined, CheckOutlined, ArrowRightOutlined } from "@ant-design/icons";
import axios from 'axios';
import './rightcontent.css';

export default function RightContent({ selectedItems = [], setSelectedItems, setRightContent, setPaymentInfo }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [customerSelected, setCustomerSelected] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQRCodeWaiting, setIsQRCodeWaiting] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const amount = selectedItems.reduce((acc, item) => {
      const price = item.price;
      return acc + (item.quantity || 1) * price;
    }, 0);
    const discountAmount = amount * 0.1; // 10% discount
    setTotalAmount(amount - discountAmount);
    setDiscount(discountAmount);
  }, [selectedItems]);

  const removeItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const increaseQuantity = (index) => {
    const newItems = [...selectedItems];
    newItems[index].quantity = (newItems[index].quantity || 1) + 1;
    setSelectedItems(newItems);
  };

  const decreaseQuantity = (index) => {
    const newItems = [...selectedItems];
    if ((newItems[index].quantity || 1) > 1) {
      newItems[index].quantity = (newItems[index].quantity || 1) - 1;
      setSelectedItems(newItems);
    }
  };

  const handleCustomerSelection = () => {
    setIsModalVisible(true);
  };

  const token = JSON.parse(localStorage.getItem('accessToken'));

  const handleSearch = async () => {
    console.log('Search value:', searchValue);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3003/cashier/customer/${searchValue}`, {
        headers: {  
          Authorization: `Bearer ${token}`
        }
      });

      console.log('API Response:', response.data);
      
      if (response.data && response.data.customer_name) {
        setCustomerDetails({
          name: response.data.customer_name,
          phoneNumber: response.data.customer_phone,
          // points: response.data.points,
        });
        setCustomerSelected(true);
        setIsModalVisible(false);  // Close modal after search success
      } else {
        alert('Customer not found');
        setCustomerDetails({});
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error:', error.response.data);
        alert(`Error: ${error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request error:', error.request);
        alert('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        alert('Error in request setup.');
      }
    
    } finally {
      setLoading(false);
    }
  };
  
  const handleQRCodeWait = () => {
    setIsQRCodeWaiting(true);
    setTimeout(() => {
      setIsQRCodeWaiting(false);
      // Simulate customer selection based on QR code (you can implement the actual flow)
      setCustomerDetails({
        name: 'Jane Smith',
        phoneNumber: '098-765-4321',
        points: 85
      });
      setCustomerSelected(true);
      setIsModalVisible(false);
    }, 3000); // Simulating QR code scanning delay
  };

  const handleChangeCustomer = () => {
    setCustomerSelected(false);
    setIsModalVisible(true);
  };

  const handleProceed = () => {
    setPaymentInfo({ totalAmount, discount, customerDetails });
    setRightContent('PaymentMethods');
  };

  const taxRate = 0.05; // Example tax rate of 5%
  const taxAmount = (totalAmount + discount) * taxRate;

  return (
    <div className='content-right'>
      <div className='add-customer'>
        {customerSelected && customerDetails.name ? (
          <div className='customer-details'>
            <div className='customer-info'>
              <span className='customer-name'>Name: {customerDetails.name}</span>
              <span className='customer-phone'>Phone: {customerDetails.phoneNumber}</span>
              <span className='customer-points'>Points: {customerDetails.points}</span>
            </div>
            <button className='change-customer' onClick={handleChangeCustomer}><ArrowRightOutlined /> Change Customer</button>
          </div>
        ) : (
          <button onClick={handleCustomerSelection}><PlusOutlined /> Add Customer</button>
        )}
      </div>
      <div className='selected-items'>
        {selectedItems.map((item, index) => {
          const price = item.price; // Use the fixed price
          const quantity = item.quantity || 1;
          const total = (quantity * price).toFixed(2);

          return (
            <div className='selected-item-card' key={index}>
              <div className='item-name'>{item.item_name}</div>
              <div className='item-details'>
                <span className='item-price'>
                  {isNaN(price) ? 'Invalid Price' : `$${price.toFixed(2)} / unit`}
                </span>
                <div className='quantity-controls'>
                  <button onClick={() => decreaseQuantity(index)}><MinusOutlined /></button>
                  <span>{quantity}</span>
                  <button onClick={() => increaseQuantity(index)}><PlusOutlined /></button>
                </div>
                <span className='item-total'>
                  {isNaN(total) ? 'Invalid Total' : `$${total}`}
                </span>
              </div>
              <button className='remove-item' onClick={() => removeItem(index)}><CloseOutlined /></button>
            </div>
          );
        })}
      </div>
      <div className='order-summary'>
        <div className='summary-row'>
          <span>Subtotal:</span>
          <span>${(totalAmount + discount).toFixed(2)}</span>
        </div>
        <div className='summary-row'>
          <span>Tax:</span>
          <span>${taxAmount.toFixed(2)}</span> {/* Calculated tax amount */}
        </div>
        <div className='summary-row'>
          <span>Payable Amount:</span>
          <span>${(totalAmount + taxAmount).toFixed(2)}</span>
        </div>
      </div>
      <div className='order-actions'>
        <button className='proceed' onClick={handleProceed}><CheckOutlined /> Proceed</button>
      </div>

      {/* Customer Selection Modal */}
      <Modal
        title="Select Customer"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
      <Input
        placeholder="Enter phone number"
        value={searchValue}
        onChange={e => {
        setSearchValue(e.target.value);
          console.log('Updated search value:', e.target.value);
        }}
        style={{ marginBottom: '10px' }}
        />

        <Button type="primary" onClick={handleSearch} loading={loading}>Search by phone number</Button>
        <Button onClick={handleQRCodeWait} style={{ marginLeft: '10px' }}>QR Code</Button>
        {isQRCodeWaiting && <Spin style={{ marginLeft: '10px' }} />}
      </Modal>
    </div>
  );
}
