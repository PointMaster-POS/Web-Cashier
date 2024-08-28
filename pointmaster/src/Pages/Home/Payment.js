import React from 'react';
import { Card, Button } from 'antd';

export default function Payment({ totalAmount, discount, setRightContent }) {
  const handleCashPayment = () => {
    // Handle cash payment logic here
    alert('Cash payment selected');
  };

  const handleCardPayment = () => {
    // Handle card payment logic here
    alert('Card payment selected');
  };

  return (
    <div className="payment-content">
      <h2>Payment</h2>
      <div className="payment-summary">
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        <p>Discount: ${discount.toFixed(2)}</p>
        <p>Amount to Pay: ${(totalAmount - discount).toFixed(2)}</p>
      </div>
      <div className="payment-methods">
        <Card title="Select Payment Method">
          <Button type="primary" onClick={handleCashPayment}>
            Cash
          </Button>
          <Button type="default" onClick={handleCardPayment} style={{ marginLeft: '10px' }}>
            Card
          </Button>
        </Card>
      </div>
      <Button type="default" onClick={() => setRightContent('RightContent')} style={{ marginTop: '20px' }}>
        Go Back
      </Button>
    </div>
  );
}
