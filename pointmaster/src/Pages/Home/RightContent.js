import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Spin } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined, PauseOutlined, CheckOutlined, ArrowRightOutlined } from "@ant-design/icons";
import './rightcontent.css';

export default function RightContent({ selectedItems, setSelectedItems }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [customerSelected, setCustomerSelected] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQRCodeWaiting, setIsQRCodeWaiting] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const amount = selectedItems.reduce((acc, item) => {
      const price = parseFloat(item.price.slice(1)) || 0;
      return acc + (item.quantity || 0) * price;
    }, 0);
    const discountAmount = amount * 0.1; //10% discount
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
    newItems[index].quantity = (newItems[index].quantity || 0) + 1;
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

  const handleSearch = () => {
    // Simulate search or QR code scanning
    setCustomerDetails({ name: 'John Doe', phoneNumber: searchValue, points: 120 }); // Simulate customer data
    setCustomerSelected(true);
    setIsModalVisible(false);
  };

  const handleQRCodeWait = () => {
    setIsQRCodeWaiting(true);
    setTimeout(() => {
      setIsQRCodeWaiting(false);
      setCustomerDetails({ name: 'Jane Smith', phoneNumber: '098-765-4321', points: 85 }); // Simulate customer data
      setCustomerSelected(true);
      setIsModalVisible(false);
    }, 3000); // Simulate QR code scanning delay
  };

  const handleChangeCustomer = () => {
    setCustomerSelected(false);
    setIsModalVisible(true);
  };

  return (
    <div className='content-right'>
      <div className='add-customer'>
        {customerSelected ? (
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
          if (!item.quantity) {
            item.quantity = 1;
          }

          const price = parseFloat(item.price.slice(1)) || 0;
          const quantity = item.quantity || 0;
          const total = (quantity * price).toFixed(2);

          return (
            <div className='selected-item-card' key={index}>
              <div className='item-name'>{item.name}</div>
              <div className='item-details'>
                <span className='item-price'>
                  {isNaN(price) ? 'Invalid Price' : `$${price.toFixed(2)} / unit`}
                </span>
                <div className='quantity-controls'>
                  <button onClick={() => decreaseQuantity(index)}><MinusOutlined /></button>
                  <span>{quantity}</span>
                  <button onClick={() => increaseQuantity(index)}><PlusOutlined /></button>
                </div>
                <span className='item-discount'>
                  {isNaN(discount) ? 'Invalid Discount' : `$${discount.toFixed(2)}`}
                </span>
                <span className='item-total'>
                  {isNaN(total) ?
                  'Invalid Total' : `$${total}`}
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
            <span>$45.00</span> {/* tax calculation */}
          </div>
          <div className='summary-row'>
            <span>Payable Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        <div className='order-actions'>
          <button className='hold-order'><PauseOutlined /> Hold Order</button>
          <button className='proceed'><CheckOutlined /> Proceed</button>
        </div>
  
        {/* Customer Selection Modal */}
        <Modal
          title="Select Customer"
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          {!isQRCodeWaiting ? (
            <div>
              <Input
                placeholder="Enter phone number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button type="primary" onClick={handleSearch} style={{ marginTop: '10px' }}>
                Search by Phone Number
              </Button>
              <Button type="default" onClick={handleQRCodeWait} style={{ marginTop: '10px', marginLeft: '10px' }}>
                Scan QR Code
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spin size="large" />
              <p>Waiting for QR Code scan...</p>
            </div>
          )}
        </Modal>
      </div>
    );
  }
  