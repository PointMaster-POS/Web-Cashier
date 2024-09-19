import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './paymentmethods.css';

export default function PaymentMethods({ customerDetails, totalAmount, totalDiscount, points, setRightContent, selectedItems }) {
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
    const payable = (totalAmount - totalDiscount - redeemDiscount).toFixed(2);
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

  const payableAmount = (totalAmount - totalDiscount - redeemDiscount).toFixed(2);

  const handleCompletePayment = async () => {
    const billData = {
      payment_method: selectedMethod || 'cash', // Default to 'cash' if no method selected
      total_amount: totalAmount,
      items_list: selectedItems.map(item => ({
        item_id: item.item_id,
        category_id: item.category_id,
        price: item.price,
        quantity: item.quantity || 1
      })),
      loyalty_points_redeemed: redeemDiscount / 0.01, // Convert discount back to points
      discount: totalDiscount,
      received: selectedMethod === 'cash' ? parseFloat(cashAmount) : 0, // Only applicable for cash
      notes: 'good customer', // Example note
      customer_phone: customerDetails.phoneNumber
    };

    console.log('Bill Data:', billData);

    try {
      const response = await fetch('http://localhost:3003/cashier/bill/new-bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
      });

      if (response.ok) {
        alert('Bill created successfully');
        // Optionally, handle successful response (e.g., redirect, clear form)
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
        <Button type="primary"  icon={<ArrowLeftOutlined />} onClick={() => setRightContent('RightContent')} className='back-button'>Back to Items</Button>
      </div>

      <div className="payment-container">
        {/* Redeem Points Section */}
        <Button className='redeem-points-button' type="primary" onClick={handleRedeemPoints} disabled={!redeemEligible}> Redeem Points</Button>

        <div className='payment-info-container'>
          <h3 className='sub-topic'>Bill Information</h3>
          <div className='payment-info'>
            <div className='info-item'>
              <p><strong>Customer:</strong></p>
              <p>{customerDetails.name || 'No customer selected'}</p>
            </div>
            <div className='info-item'>
              <p><strong>Bill Total:</strong></p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
            <div className='info-item'>
              <p><strong>Discount:</strong></p>
              <p>${totalDiscount.toFixed(2)}</p>
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
              <p>${payableAmount}</p>
            </div>
          </div>
        </div>

        <div className='payment-methods-container'>
          <h3 className='sub-topic'>Payment Methods</h3>
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
            <div className='cash-info-container'>
              <h3 className='sub-topic'>Cash Payment</h3>
              <div className='payment-info'>
                
                {/* Payable Amount */}
                <div className='info-item'>
                  <p><strong>Total Amount:</strong></p>
                  <p>${(totalAmount - totalDiscount - redeemDiscount).toFixed(2)}</p>
                </div>
                
                {/* Cash Received */}
                <div className='info-item'>
                  <p><strong>Cash Received:</strong></p>
                  
                  <div className="input-with-button">
                    {/* Input field without increase/decrease buttons */}
                    <Input
                      type="text" // Changed to "text" to remove the increase/decrease buttons
                      pattern="[0-9]*" // This keeps it accepting only numbers
                      placeholder="Enter amount received"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      className="cash-input"
                    />
                    
                    {/* Enter button */}
                    <Button
                      type="primary"
                      onClick={handleCashPayment} // Validation occurs when the button is clicked
                      className='enter-button'
                    >
                      Enter
                    </Button>
                  </div>
                </div>


                {/* Balance to give */}
                <div className='info-item'>
                  <p><strong>Balance:</strong></p>
                  <p>${balance}</p>
                </div>

                {/* Payment Status */}
                <div className='info-item'>
                  <p><strong>Payment Status:</strong></p>
                  <p>Cash</p>
                </div>
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

          <Button type="primary" className='complete-payment' onClick={handleCompletePayment}>
            Complete Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
