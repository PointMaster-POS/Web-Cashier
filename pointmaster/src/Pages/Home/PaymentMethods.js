import React from 'react';
import { Button } from 'antd';
import './paymentmethods.css';

export default function PaymentMethods({ customerDetails, totalAmount, discount, setRightContent }) {
  return (
    <div className='payment-methods'>
      <h2>Payment Summary</h2>
      <div className='payment-info'>
        <p>Customer: {customerDetails.name || 'No customer selected'}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
        <p>Discount: ${discount.toFixed(2)}</p>
        <p>Payable Amount: ${(totalAmount - discount).toFixed(2)}</p>
      </div>
      <div className='payment-actions'>
        <Button type="primary" onClick={() => setRightContent('RightContent')}>Back to Items</Button>
        <Button type="primary" style={{ marginLeft: '10px' }}>Complete Payment</Button>
      </div>
    </div>
  );
}
