import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './paymentmethods.css';

export default function PaymentMethods({ customerDetails, totalAmount, discount, points, setRightContent }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cashAmount, setCashAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [redeemEligible, setRedeemEligible] = useState(false);
  const [redeemDiscount, setRedeemDiscount] = useState(0);

  // Function to check redeem points eligibility
  async function checkRedeemPointsEligibility(customerId) {
    try {
      const response = await fetch('http://localhost:3003/cashier/loyalty/eligibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: customerId }),
      });

      const data = await response.json();
      return data.isEligible;
    } catch (error) {
      console.error('Error checking redeem points eligibility:', error);
      return false;
    }
  }

  // Fetch redeem eligibility when customerDetails changes
  useEffect(() => {
    const fetchEligibility = async () => {
      if (customerDetails?.id) { // Check if customerDetails contains an id
        const isEligible = await checkRedeemPointsEligibility(customerDetails.id);
        setRedeemEligible(isEligible);
      }
    };
    fetchEligibility();
  }, [customerDetails]);

  const handleCashPayment = () => {
    const payable = (totalAmount - discount - redeemDiscount).toFixed(2);
    const cashReceived = parseFloat(cashAmount);
    setBalance((cashReceived - payable).toFixed(2));
  };

  const handleRedeemPoints = () => {
    if (redeemEligible) {
      const pointsValue = points * 0.01; // Assuming 1 point = $0.01
      setRedeemDiscount(pointsValue);
      setSelectedMethod('redeemPoints');
    } else {
      alert("Customer is not eligible for redeeming points.");
    }
  };

  return (
    <div className='payment-methods'>
      <div className='header'>
        <h2 className='payment-summary'>Payment Summary</h2>
        <Button type="primary"  icon={<ArrowLeftOutlined />} onClick={() => setRightContent('RightContent')} className='back-button'>Back to Items</Button>
      </div>

      <div className="payment-container">
        {/* Redeem Points Section */}
        <Button className='redeem-points-button' type="primary" onClick={handleRedeemPoints} disabled={!redeemEligible}> Redeem Points</Button>

        <div className='payment-info-container'>
          <h3>Bill Information</h3>
          <div className='payment-info'>
            <div className='info-item'>
              <p><strong>Customer:</strong></p>
              <p>{customerDetails.name || 'No customer selected'}</p>
            </div>
            <div className='info-item'>
              <p><strong>Total Amount:</strong></p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
            <div className='info-item'>
              <p><strong>Discount:</strong></p>
              <p>${discount.toFixed(2)}</p>
            </div>
            <div className='info-item'>
              <p><strong>Points:</strong></p>
              <p>{points || 0}</p>
            </div>
            <div className='info-item'>
              <p><strong>Redeem Discount:</strong></p>
              <p>${redeemDiscount.toFixed(2)}</p>
            </div>
            <div className='info-item'>
              <p><strong>Payable Amount:</strong></p>
              <p>${(totalAmount - discount - redeemDiscount).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className='payment-methods-container'>
          <h3>Payment Methods</h3>
          <div className='payment-method-buttons'>
            <Button 
              className={`payment-button ${selectedMethod === 'cash' ? 'selected' : ''}`} 
              type="primary" 
              onClick={() => setSelectedMethod('cash')}
            >
              Cash
            </Button>
            <Button 
              className={`payment-button ${selectedMethod === 'card' ? 'selected' : ''}`} 
              type="primary" 
              onClick={() => setSelectedMethod('card')}
            >
              Credit/Debit Card
            </Button>
          </div>

          {/* Cash Payment Section */}
          {selectedMethod === 'cash' && (
            <div className='cash-payment'>
              <h3>Cash Payment</h3>
              <p><strong>Total Amount:</strong> ${(totalAmount - discount - redeemDiscount).toFixed(2)}</p>
              <Input
                type="number"
                placeholder="Enter amount received"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
              />
              <Button type="primary" onClick={handleCashPayment} className='calculate-button'>
                Calculate Balance
              </Button>
              {balance !== 0 && <p><strong>Balance to give:</strong> ${balance}</p>}
              <p><strong>Payment Status:</strong> Cash</p>
            </div>
          )}

          {/* Card Payment Section */}
          {selectedMethod === 'card' && (
            <div className='card-payment'>
              <h4>Card Payment</h4>
              <p>Please choose Credit or Debit card option at the payment terminal.</p>
              <p><strong>Payment Status:</strong> Card</p>
            </div>
          )}

          <Button type="primary" className='complete-payment'>
            Complete Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
