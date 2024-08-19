import React from 'react'
import RightContent from './RightContent';
import LeftContent from './LeftContent';
import './home.css';

function Home() {
  return (
    <div className='content'>
      <div className='content-left'>
        <LeftContent/>
      </div>
      <div className='content-right'>
        <RightContent/>
      </div>
    </div>
  )
}

export default Home;
