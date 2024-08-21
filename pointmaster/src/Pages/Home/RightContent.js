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

  // Mock customer data
  const customers = [
    { name: 'John Doe', phoneNumber: '123-456-7890', points: 120 },
    { name: 'Jane Smith', phoneNumber: '098-765-4321', points: 85 },
    { name: 'Alice Johnson', phoneNumber: '555-123-4567', points: 200 },
    { name: 'Bob Brown', phoneNumber: '444-555-6666', points: 60 },
  ];

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
    // Find customer based on the search value (phone number)
    const customer = customers.find(c => c.phoneNumber === searchValue);
    if (customer) {
      setCustomerDetails(customer);
      setCustomerSelected(true);
      setIsModalVisible(false);
    } else {
      alert('Customer not found');
    }
  };

  const handleQRCodeWait = () => {
    setIsQRCodeWaiting(true);
    setTimeout(() => {
      setIsQRCodeWaiting(false);
      setCustomerDetails(customers[1]); // Simulate customer selection based on QR code
      setCustomerSelected(true);
      setIsModalVisible(false);
    }, 3000); // Simulating QR code scanning delay
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
          <span>$25.00</span> {/* Add logic for tax calculation */}
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
