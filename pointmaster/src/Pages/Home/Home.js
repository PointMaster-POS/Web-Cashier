import React, { useState } from 'react';
import RightContent from './RightContent';
import LeftContent from './LeftContent';
import PaymentMethods from './PaymentMethods';
import './home.css';

function Home() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [rightContent, setRightContent] = useState('RightContent');
  const [paymentInfo, setPaymentInfo] = useState({});

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div className='home-container'>
      <div className='home-left-side'>
        <LeftContent onAddItem={handleAddItem} />
      </div>
      <div className='home-right-side'>
        {rightContent === 'RightContent' ? (
          <RightContent
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            setRightContent={setRightContent}
            setPaymentInfo={setPaymentInfo}
          />
        ) : (
          <PaymentMethods
            customerDetails={paymentInfo.customerDetails}
            totalAmount={paymentInfo.totalAmount}
            totalDiscount={paymentInfo.totalDiscount}
            setRightContent={setRightContent}
            selectedItems={selectedItems}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
