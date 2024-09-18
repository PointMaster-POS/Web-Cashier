import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './paymentmethods.css';

export default function PaymentMethods({ customerDetails, totalAmount, discount, points, checkRedeemPointsEligibility, setRightContent }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cashAmount, setCashAmount] = useState('');
  const [balance, setBalance] = useState(0);

  const handleCashPayment = () => {
    const payable = (totalAmount - discount).toFixed(2);
    const cashReceived = parseFloat(cashAmount);
    setBalance((cashReceived - payable).toFixed(2));
  };

  const handleRedeemPoints = async () => {
    const isEligible = await checkRedeemPointsEligibility();
    if (isEligible) {
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
      {/* <hr className='payment-underline'/> */}

      <div className="payment-container">
        <div className='payment-info'>
          <p><strong>Customer:</strong> {customerDetails.name || 'No customer selected'}</p>
          <p><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
          <p><strong>Discount:</strong> ${discount.toFixed(2)}</p>
          <p><strong>Payable Amount:</strong> ${(totalAmount - discount).toFixed(2)}</p>
          <p><strong>Points:</strong> {points || 0}</p>
        </div>

        <h3>Payment Methods</h3>
        <div className='payment-method-buttons'>
          <Button className='payment-button' type="primary" onClick={() => setSelectedMethod('cash')}>Cash</Button>
          {/* <Button className='payment-button' type="primary" onClick={handleRedeemPoints} disabled={points <= 0}>Redeem Points</Button> */}
          <Button className='payment-button' type="primary">Cards</Button>
        </div>

        {selectedMethod === 'cash' && (
          <div className='cash-payment'>
            <h4>Cash Payment</h4>
            <p><strong>Total Amount:</strong> ${(totalAmount - discount).toFixed(2)}</p>
            <Input
              type="number"
              placeholder="Enter amount received"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
            />
            <Button type="primary" onClick={handleCashPayment} className='calculate-button'>Calculate Balance</Button>
            {balance !== 0 && <p><strong>Balance to give:</strong> ${balance}</p>}
          </div>
        )}

        {selectedMethod === 'redeemPoints' && (
          <div className='redeem-points'>
            <h4>Redeem Points</h4>
            <p>Points will be used for this payment.</p>
            {/* Add more details if needed */}
          </div>
        )}

        <Button type="primary" style={{ marginTop: '20px' }}>Complete Payment</Button>
      </div>
      
    </div>
  );
}
