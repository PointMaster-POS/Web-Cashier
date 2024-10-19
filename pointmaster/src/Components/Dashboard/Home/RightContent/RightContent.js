import React, { useState, useContext, useEffect } from 'react';
import { Modal, Input, Spin, Button } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined, CheckOutlined, ArrowRightOutlined, PauseOutlined, QrcodeOutlined } from "@ant-design/icons";
import axios from 'axios';
import { notification } from 'antd';
import { HomeContext } from '../../../../Context/HomeContext';
import './rightcontent.css';
import baseUrl from '../../../../apiConfig';
import { QrReader } from 'react-qr-reader';  



export default function RightContent() {
  const {isQRCodeVisible,
    setIsQRCodeVisible,
    searchValue,
    setSearchValue,
    qrCodeScanned,
    setQrCodeScanned,
    selectedItems, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    customerDetails, 
    customerSelected, 
    handleCustomerSelection, 
    resetCustomerSelection, 
    setRightContent, 
    resetTransaction,
    setTotalAmount,
    setTotalDiscount,
    holdBillData,
    increaseQuantityHold,
    decreaseQuantityHold,
    removeItemHold,
  } = useContext(HomeContext);
  
  const [totalAmount, setLocalTotalAmount] = useState(0);
  const [totalDiscount, setLocalTotalDiscount] = useState(0); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const [loading, setLoading] = useState(false); 
  
  const [scanResult, setScanResult] = useState(null);


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
  
    if (holdBillData && holdBillData.items) {
      holdBillData.items.forEach(item => {
        const price = item.price || 0; 
        const quantity = item.quantity || 1;
        const discountPerItem = (item.discount || 0) * quantity;
        discountSum += discountPerItem;
        amount += price * quantity;
      });
    }
  
    setLocalTotalAmount(amount);
    setLocalTotalDiscount(discountSum);
    setTotalAmount(amount);
    setTotalDiscount(discountSum);
  
  }, [selectedItems, holdBillData, setTotalAmount, setTotalDiscount]);
  

  const token = JSON.parse(localStorage.getItem('accessToken'));
  

  const handleSearch = async () => {
    setLoading(true);
    console.log('Token:', token);
    console.log('Search value:', searchValue);
    try {
      const response = await axios.get(`${baseUrl}:3003/cashier/customer/${searchValue}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Customer data:', response.data);

      if (response.data && response.data.customer_name) {
        const customer = {
          id: response.data.customer_id,
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

  useEffect(() => {
    if (holdBillData && holdBillData.customerPhone && !customerSelected) {
      const fetchCustomerData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${baseUrl}:3003/cashier/customer/${holdBillData.customerPhone}`, 
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log('Customer data:', response.data);
  
          if (response.data && response.data.customer_name) {
            const customer = {
              id: response.data.customer_id,
              name: response.data.customer_name,
              phoneNumber: response.data.customer_phone,
              points: response.data.points,
            };
            handleCustomerSelection(customer); 
          } else {
            alert('Customer not found');
          }
        } catch (error) {
          console.error('Error:', error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCustomerData();
    }
  }, [holdBillData]);
  

  const handleQRCodeScan = (result) => {
    if (result) {
      console.log("QR data:", result.text);
  
      // Set the scanned value to state, but do not call handleSearch here
      setSearchValue(result.text); 
      
  
      // Log to see the result (note: searchValue won't update immediately here)
      console.log("Search value before effect:", result.text);
  
      // Only allow one scan per session
      if (!qrCodeScanned) {
        setQrCodeScanned(true); // This flag ensures only one scan per session
      }
    }
  };
  
  const handleQRCodeError = (err) => {
    console.error('QR code scan error:', err);
    if (err.message) {
      console.error('Error message:', err.message);
    }
  };
  
  // Use useEffect to trigger handleSearch when searchValue and qrCodeScanned are set
  useEffect(() => {
    if (searchValue && qrCodeScanned) {
      console.log("Updated searchValue:", searchValue); // This will log the correct updated value
      handleSearch(); // Trigger search after searchValue is updated
    }
  }, [searchValue, qrCodeScanned]); // Effect triggers when either searchValue or qrCodeScanned changes
  

  const openModal = () => {
    setQrCodeScanned(false); // Reset the scanned state when reopening the modal
    setIsQRCodeVisible(true);
  };


  const handleProceed = () => {
    setRightContent('PaymentMethods');
  };

  const handleHoldPayment = async () => {
    const billData = {
      payment_method: 'on-hold', 
      total_amount: totalAmount,
      items_list: selectedItems.map(item => ({
        item_id: item.item_id,
        category_id: item.category_id,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      loyalty_points_redeemed: 0,  
      discount: totalDiscount,
      received: 0,
      notes: 'payment on hold', 
      customer_phone: customerDetails.phoneNumber,
      status: false,
    };

    try {
      const response = await fetch(`${baseUrl}:3003/cashier/bill/new-bill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(billData),
      });
      
      if (response.ok) {
        notification.success({
          message: 'Bill got hold',
          description: 'The bill has been hold!',
          duration: 3, 
        });
        resetTransaction();
        setRightContent('RightContent');
      } else {
        alert('Error creating bill');
      }
    } catch (error) {
      console.error('Error creating bill:', error);
      alert('Error creating bill');
    }
  };

  return (
    <div className='content-right'>
      <div className='add-customer'>
        {(customerSelected && customerDetails.name) ? (
          <div className='customer-details'>
            <div className='customer-info'>
              <span className='customer-name'>Name: {customerDetails.name }</span>
              <span className='customer-phone'>Phone: {customerDetails.phoneNumber }</span>
              <span className='customer-points'>Points: {customerDetails.points || 0}</span>
            </div>
            <button className='change-customer' onClick={resetCustomerSelection}>
              <ArrowRightOutlined /> Change Customer
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => setIsModalVisible(true)} className="add-customer-btn">
              <PlusOutlined /> Add Customer
            </button>
            <button onClick={openModal} className="add-qr-btn" style={{ marginLeft: '10px' }}>
              <QrcodeOutlined /> Scan QR Code
            </button>
          </>
        )}
      </div>
      <div className='selected-items'>
        {holdBillData ? (
          <div className='hold-bill-details'>
            {Array.isArray(holdBillData.items) && holdBillData.items.length > 0 ? (
              holdBillData.items.map((item, index) => {
                const price = parseFloat(item.price); 
                const quantity = parseInt(item.quantity, 10); 
                const discountPerItem = (item.discount || 0) * quantity;
                const total = (quantity * price).toFixed(2);
                
                return (
                  <div className='selected-item-card' key={index}>
                    <div className='item-name'>{item.item_name}</div>
                      <div className='item-details'>
                        <span className='item-price'>
                          {isNaN(price) ? 'Invalid Price' : `Rs.${price.toFixed(2)} / unit`}
                        </span>
                        <div className='quantity-controls'>
                          <button onClick={() => decreaseQuantityHold(index)}><MinusOutlined /></button>
                          <span>{quantity}</span>
                          <button onClick={() => increaseQuantityHold(index)}><PlusOutlined /></button>
                        </div>
                        <span className='item-discount'>
                          {`Discount: Rs.${discountPerItem.toFixed(2)}`}
                        </span>
                        <span className='item-total'>
                          {isNaN(total) ? 'Invalid Total' : `Rs.${total}`}
                        </span>
                      </div>
                      <button className='remove-item' onClick={() => removeItemHold(index)}><CloseOutlined /></button>
                    </div>
                  );
              })
            ) : null}
          </div>
        ) : null}
            <div>
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
                        {isNaN(price) ? 'Invalid Price' : `Rs.${price.toFixed(2)} / unit`}
                      </span>
                      <div className='quantity-controls'>
                        <button onClick={() => decreaseQuantity(index)}><MinusOutlined /></button>
                        <span>{quantity}</span>
                        <button onClick={() => increaseQuantity(index)}><PlusOutlined /></button>
                      </div>
                      <span className='item-discount'>
                        {`Discount: Rs.${discountPerItem.toFixed(2)}`}
                      </span>
                      <span className='item-total'>
                        {isNaN(total) ? 'Invalid Total' : `Rs.${total}`}
                      </span>
                    </div>
                    <button className='remove-item' onClick={() => removeItem(index)}><CloseOutlined /></button>
                  </div>
                );
              })}
            </div>
    </div>
        <div className='order-summary'>
          <div className='summary-row'>
            <span>Bill Total:</span>
            <span>Rs.{totalAmount.toFixed(2)}</span>
          </div>
          <div className='summary-row'>
            <span>Discount:</span>
            <span>-Rs.{totalDiscount.toFixed(2)}</span>
          </div>
        </div>
        <div className='order-actions'>
          <button className='hold' onClick={handleHoldPayment}><PauseOutlined /> Hold</button>
          <button className='proceed' onClick={handleProceed}><CheckOutlined /> Proceed</button>
        </div>

        <Modal
          title="Select Customer"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
        <Input
          placeholder="Enter phone number"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Button 
          type="primary" 
          onClick={handleSearch} 
          loading={loading} 
          style={{ backgroundColor: "#414141", borderColor: 'black' }}
          >Search by phone number
        </Button>
        </Modal>

        {/* <Button onClick={handleQRCodeWait} style={{ marginLeft: '10px' }}>QR Code</Button> */}
        {/* QR Code Reader */}
        {/* <QrReader
            delay={300}
            onError={handleQRCodeError}
            onScan={handleQRCodeScan}
            style={{ width: '100%' }}
          />
        {isQRCodeWaiting && <Spin />} */}
        
        {/* QR Code Scanner Modal */}
        <Modal
          title="Scan QR Code"
          open={isQRCodeVisible}
          onCancel={() => setIsQRCodeVisible(false)}
          footer={null}
        >
          {/* Conditionally render the QR reader or a confirmation message */}
          {!qrCodeScanned ? (
            <QrReader
              delay={600}
              onResult={(result, error) => {
                if (result) {
                  handleQRCodeScan(result);
                } else if (error) {
                  handleQRCodeError(error);
                }
              }}
              style={{ width: '100%' }} // Styling for the reader
            />
          ) : (
            <div>
              <h3>QR Code Scanned Successfully!</h3>
              <button onClick={() => setIsQRCodeVisible(false)}>Close</button>
              {/* You can also call a function here to do something with the scanned data */}
            </div>
          )}
        </Modal>

      
    </div>
  );
}
