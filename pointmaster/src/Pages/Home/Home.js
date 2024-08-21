import React, { useState } from 'react';
import RightContent from './RightContent';
import LeftContent from './LeftContent';
import './home.css';

function Home() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div className='home-container'>
      <div className='home-left-side'>
        <LeftContent onAddItem={handleAddItem} />
      </div>
      <div className='home-right-side'>
        <RightContent selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      </div>
    </div>
  )
}

export default Home;
