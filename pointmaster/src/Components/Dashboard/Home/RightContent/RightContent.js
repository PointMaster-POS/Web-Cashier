import React, { useState, useContext, useEffect } from 'react';
import { Modal, Input, Button, Spin } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined, CheckOutlined, ArrowRightOutlined, PauseOutlined } from "@ant-design/icons";
import axios from 'axios';
import { HomeContext } from '../../../../Context/HomeContext';
import './rightcontent.css';


export default function RightContent() {
  const {
    selectedItems, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    customerDetails, 
    customerSelected, 
    handleCustomerSelection, 
    resetCustomerSelection, 
    setRightContent, 
    setPaymentInfo, 
    setTotalAmount,
    setTotalDiscount
  } = useContext(HomeContext);
  
  const [totalAmount, setLocalTotalAmount] = useState(0);
  const [totalDiscount, setLocalTotalDiscount] = useState(0); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQRCodeWaiting, setIsQRCodeWaiting] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let amount = 0;
    let discountSum = 0;

    selectedItems.forEach(item => {
      const price = item.price || 0; 
      const quantity = item.quantity || 1;
      const discountPerItem = (item.discount || 0) * quantity;
      discountSum += discountPerItem;
      amount += price * quantity;
    });

    setLocalTotalAmount(amount);
    setLocalTotalDiscount(discountSum);
    setTotalAmount(amount); // Update context
    setTotalDiscount(discountSum); // Update context
  }, [selectedItems, setTotalAmount, setTotalDiscount]);

  const token = JSON.parse(localStorage.getItem('accessToken'));

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3003/cashier/customer/${searchValue}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.customer_name) {
        const customer = {
          name: response.data.customer_name,
          phoneNumber: response.data.customer_phone,
          points: response.data.points
        };
        handleCustomerSelection(customer);
        setIsModalVisible(false);
      } else {
        alert('Customer not found');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error in request setup.');
    } finally {
      setLoading(false);
    }
  };

  const handleQRCodeWait = () => {
    setIsQRCodeWaiting(true);
    setTimeout(() => {
      const customer = {
        name: 'Jane Smith',
        phoneNumber: '098-765-4321',
        points: 85,
      };
      handleCustomerSelection(customer);
      setIsModalVisible(false);
      setIsQRCodeWaiting(false);
    }, 3000);
  };

  const handleProceed = () => {
    setRightContent('PaymentMethods');
  };

  return (
    <div className='content-right'>
      <div className='add-customer'>
        {customerSelected && customerDetails.name ? (
          <div className='customer-details'>
            <div className='customer-info'>
              <span className='customer-name'>Name: {customerDetails.name}</span>
              <span className='customer-phone'>Phone: {customerDetails.phoneNumber}</span>
              <span className='customer-points'>Points: {customerDetails.points || 0}</span>
            </div>
            <button className='change-customer' onClick={resetCustomerSelection}><ArrowRightOutlined /> Change Customer</button>
          </div>
        ) : (
          <button onClick={() => setIsModalVisible(true)}><PlusOutlined /> Add Customer</button>
        )}
      </div>

      <div className='selected-items'>
        {selectedItems.map((item, index) => {
          const price = item.price || 0; 
          const quantity = item.quantity || 1;
          const discountPerItem = (item.discount || 0) * quantity;
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
                <span className='item-discount'>
                  {`Discount: $${discountPerItem.toFixed(2)}`}
                </span>
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
          <span>Bill Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className='summary-row'>
          <span>Discount:</span>
          <span>-${totalDiscount.toFixed(2)}</span>
        </div>
      </div>

      <div className='order-actions'>
      <button className='proceed' onClick={handleProceed}><PauseOutlined /> Hold</button>
        <button className='proceed' onClick={handleProceed}><CheckOutlined /> Proceed</button>
      </div>

      <Modal
        title="Select Customer"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Input
          placeholder="Enter phone number"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button type="primary" onClick={handleSearch} loading={loading}>Search by phone number</Button>
        <Button onClick={handleQRCodeWait} style={{ marginLeft: '10px' }}>QR Code</Button>
        {isQRCodeWaiting && <Spin />}
      </Modal>
    </div>
  );
}
