import React, { useContext } from 'react';
import RightContent from '../../../Components/Dashboard/Home/RightContent/RightContent';
import LeftContent from '../../../Components/Dashboard/Home/LeftContent/LeftContent';
import PaymentMethods from '../../../Components/Dashboard/Home/PaymentMethods/PaymentMethods';
import { HomeContext } from '../../../Context/HomeContext';
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
