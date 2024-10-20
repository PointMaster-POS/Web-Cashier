import React, { useState, useContext, useEffect } from 'react';
import { Button, Input } from 'antd';
import { notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { HomeContext } from '../../../../Context/HomeContext';
import './paymentmethods.css';
import baseUrl from '../../../../apiConfig';


export default function PaymentMethods() {
  const {
    customerDetails,
    totalAmount,
    totalDiscount,
    selectedItems,
    resetTransaction,
    setRightContent,
  } = useContext(HomeContext);

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cashAmount, setCashAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [redeemEligible, setRedeemEligible] = useState(false);
  const [redeemDiscount, setRedeemDiscount] = useState(0);
  const [pointsRedeemed, setPointsRedeemed] = useState(0);
  const fetchToken = async () => {
    return localStorage.getItem('accessToken');
  };

  async function checkRedeemPointsEligibility(customerId) {
    try {

      const token = await fetchToken();
      const response = await fetch(`${baseUrl}:3003/cashier/loyalty/eligibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ customer_id: customerId }), 
      });
      
      console.log('Response:', response);
      const data = await response.json();
      console.log('Redeem Points Eligibility:', data);
      return data.eligibility;
      
    } catch (error) {
      console.error('Error checking redeem points eligibility:', error);
      return false;
    }
  }
  
  useEffect(() => {
    const fetchEligibility = async () => {
      if (customerDetails?.id) {
        console.log('Customer ID:', customerDetails.id);  
        const isEligible = await checkRedeemPointsEligibility(customerDetails.id);
        setRedeemEligible(isEligible); 
      }
    };
    fetchEligibility();
  }, [customerDetails]); 

  const handleRedeemPoints = () => {
    if (redeemEligible) {
      const pointsValue = (customerDetails.points || 0) * 0.01; // Ensure points has a fallback
      setRedeemDiscount(pointsValue);
      setPointsRedeemed(1);
    } else {
      alert('Customer is not eligible for redeeming points.');
    }
  };
  
  const handleCashPayment = () => {
    const payable = parseFloat(totalAmount - totalDiscount - redeemDiscount) || 0;
    const cashReceived = parseFloat(cashAmount) || 0;
    setBalance((cashReceived - payable).toFixed(2));
  };
  

  const payableAmount = (totalAmount - totalDiscount - redeemDiscount).toFixed(2);



  const handleCompletePayment = async () => {
    const billData = {
      payment_method: selectedMethod || 'cash',
      total_amount: totalAmount,
      items_list: selectedItems.map(item => ({
        item_id: item.item_id,
        category_id: item.category_id,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      loyalty_points_redeemed: pointsRedeemed,
      discount: totalDiscount,
      received: selectedMethod === 'cash' ? parseFloat(cashAmount) : 0,
      notes: 'good customer',
      customer_phone: customerDetails.phoneNumber,
      status: true,
    };
    

    try {
      const token = await fetchToken();
      const response = await fetch(`${baseUrl}:3003/cashier/bill/new-bill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(billData),
      });

      console.log('Bill Data:', billData);
      console.log('Response:', response);

      if (response.ok) {
        notification.success({
          message: 'Bill Created',
          description: 'The bill has been created successfully!',
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
    <div className='payment-methods'>
      <div className='header'>
        <h2 className='payment-summary'>Payment Summary</h2>
        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={() => setRightContent('RightContent')} className='back-button'>
          Back to Items
        </Button>
      </div>

      <div className="payment-container">
        {/* Redeem Points Section */}
        
        <Button className='redeem-points-button' type="primary" onClick={handleRedeemPoints} disabled={!redeemEligible}>
          Redeem Points
        </Button>

        {/* Bill Information */}
        <div className='payment-info-container'>
          <h3 className='sub-topic'>Bill Information</h3>
          <div className='payment-info'>
            <div className='info-item'><strong>Customer:</strong> {customerDetails.name || 'No customer selected'}</div>
            <div className='info-item'><strong>Bill Total:</strong> Rs.{totalAmount.toFixed(2)}</div>
            <div className='info-item'><strong>Discount:</strong> Rs.{totalDiscount.toFixed(2)}</div>
            <div className='info-item'><strong>Points:</strong> {customerDetails.points || 0}</div>
            <div className='info-item'><strong>Redeem Discount:</strong> Rs.{isNaN(redeemDiscount) ? 0 : redeemDiscount.toFixed(2)}</div>
            <div className='info-item'><strong>Payable Amount:</strong> Rs.{isNaN(payableAmount) ? 0 : payableAmount}</div>

          </div>
        </div>

        {/* Payment Methods Section */}
        <div className='payment-methods-container'>
          <h3 className='sub-topic'>Payment Methods</h3>
          <div className='payment-method-buttons'>
            <Button className={`payment-button ${selectedMethod === 'cash' ? 'selected' : ''}`} type="primary" onClick={() => setSelectedMethod('cash')}>
              Cash
            </Button>
            <Button className={`payment-button ${selectedMethod === 'card' ? 'selected' : ''}`} type="primary" onClick={() => setSelectedMethod('card')}>
              Credit/Debit Card
            </Button>
          </div>

          {/* Cash Payment Section */}
          {selectedMethod === 'cash' && (
            <div className='cash-info-container'>
              <h3 className='sub-topic'>Cash Payment</h3>
              <div className='payment-info'>
                <div className='info-item'><strong>Total Amount:</strong> Rs.{(totalAmount - totalDiscount - redeemDiscount).toFixed(2)}</div>
                <div className='info-item'>
                  <strong>Cash Received:</strong>
                  <div className="input-with-button">
                    <Input
                      type="text"
                      pattern="[0-9]*"
                      placeholder="Enter amount received"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      className="cash-input"
                    />
                    <Button type="primary" onClick={handleCashPayment} className='enter-button'>
                      Enter
                    </Button>
                  </div>
                </div>
                <div className='info-item'><strong>Balance:</strong> Rs.{balance}</div>
                <div className='info-item'><strong>Payment Status:</strong> Cash</div>
              </div>
            </div>
          )}

          {/* Card Payment Section */}
          {selectedMethod === 'card' && (
            <div className='card-payment'>
              <h3 className='sub-topic'>Card Payment</h3>
              <hr className='status-line' />
              <p><strong>Payment Status:</strong> Card</p>
              <hr className='status-line' />
            </div>
          )}

          {/* Complete Payment Button */}
          <Button type="primary" className='complete-payment' onClick={handleCompletePayment} disabled={!selectedMethod}>
            Complete Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
