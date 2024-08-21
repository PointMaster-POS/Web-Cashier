import React, { useState } from 'react';
import './allusers.css';

function AllUsers() {
  const otherCashiers = [
    { name: 'Jane Smith', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Alice Johnson', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Robert Brown', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Jane Smith', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Alice Johnson', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Robert Brown', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Jane Smith', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Alice Johnson', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Robert Brown', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Jane Smith', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Alice Johnson', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Robert Brown', photoUrl: 'https://via.placeholder.com/100' },
    { name: 'Jane Smith', photoUrl: 'https://via.placeholder.com/100' },
  ];

  return (
    <div className="all-users-container">
      <h2>Other Cashiers</h2>
      <div className="cashier-list">
        {otherCashiers.map((cashier, index) => (
          <div key={index} className="cashier-card">
            <img src={cashier.photoUrl} alt={cashier.name} className="small-photo" />
            <p>{cashier.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsers;
