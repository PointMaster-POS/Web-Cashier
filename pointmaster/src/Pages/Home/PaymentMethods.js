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

      <div className="payment-container"> {/* Added missing opening tag */}
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
              <p><strong>Payable Amount:</strong></p>
              <p>${(totalAmount - discount).toFixed(2)}</p>
            </div>
            <div className='info-item'>
              <p><strong>Points:</strong></p>
              <p>{points || 0}</p>
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
              Cards
            </Button>
          </div>

          {/* Cash Payment Section */}
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
      </div> {/* Correct closing for payment-container */}
    </div>
  );
}
