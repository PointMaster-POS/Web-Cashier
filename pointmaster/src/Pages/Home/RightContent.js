import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Spin } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined, CheckOutlined, ArrowRightOutlined } from "@ant-design/icons";
import axios from 'axios';
import './rightcontent.css';

export default function RightContent({ selectedItems = [], setSelectedItems, setRightContent, setPaymentInfo }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0); // Updated to track total discount
  const [customerSelected, setCustomerSelected] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isQRCodeWaiting, setIsQRCodeWaiting] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let amount = 0;
    let discountSum = 0;

    selectedItems.forEach((item) => {
      const price = item.price;
      const quantity = item.quantity || 1;
      const discountPerItem = (item.discount || 0)  * quantity; // Calculate discount for each item
      discountSum += discountPerItem;
      amount += price * quantity;
    });

    setTotalAmount(amount);
    setTotalDiscount(discountSum); // Sum of all discounts

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
        });
        setCustomerSelected(true);
        setIsModalVisible(false);  // Close modal after search success
      } else {
        alert('Customer not found');
        setCustomerDetails({});
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
    const payableAmount = totalAmount - totalDiscount; // Final payable amount
    setPaymentInfo({ totalAmount, totalDiscount, payableAmount, customerDetails });
    setRightContent('PaymentMethods');
  };

  // const taxRate = 0.05; // Example tax rate of 5%
  // const taxAmount = totalAmount * taxRate;

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
          const price = item.price;
          const quantity = item.quantity || 1;
          const discountPerItem = (item.discount || 0)  * quantity;
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
          <span>-${totalDiscount.toFixed(2)}</span> {/* Total discount */}
        </div>
        {/* <div className='summary-row'>
          <span>Tax:</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div> */}
        <div className='summary-row'>
          {/* <span>Payable Amount:</span>
          <span>${(totalAmount - totalDiscount + taxAmount).toFixed(2)}</span> Final amount */}
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
