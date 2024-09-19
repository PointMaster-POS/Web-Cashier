import React from 'react';
import RightContent from './RightContent';
import LeftContent from './LeftContent';
import PaymentMethods from './PaymentMethods';
import { useHomeContext } from '../../Context/HomeContext';
import './home.css';

function Home() {
  const { rightContent } = useHomeContext(); // Get rightContent from context

  return (
    <div className='home-container'>
      <div className='home-left-side'>
        <LeftContent />
      </div>
      <div className='home-right-side'>
        {rightContent === 'RightContent' ? <RightContent /> : <PaymentMethods />}
      </div>
    </div>
  );
}

export default Home;
