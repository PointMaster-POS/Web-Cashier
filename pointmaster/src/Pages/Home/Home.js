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
    <div className='content'>
      <div className='content-left'>
        <LeftContent onAddItem={handleAddItem} />
      </div>
      <div className='content-right'>
        <RightContent selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      </div>
    </div>
  )
}

export default Home;
