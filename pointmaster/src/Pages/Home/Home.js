import React, { useContext } from 'react';
import RightContent from './RightContent';
import LeftContent from './LeftContent';
import PaymentMethods from './PaymentMethods';
import { HomeContext } from '../../Context/HomeContext';
import './home.css';

function Home() {
  const { rightContent } = useContext(HomeContext);

  return (
    <div className='home-container'>
      <div className='home-left-side'>
        <LeftContent />
      </div>
      <div className='home-right-side'>
        {rightContent === 'PaymentMethods' ? (
          <PaymentMethods/>
        ) : (
          <RightContent />
        )}
      </div>
    </div>
  );
}

export default Home;
