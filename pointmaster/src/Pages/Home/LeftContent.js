import React, { useState } from 'react';
import './leftcontent.css';


const foodItems = {
  breakfast: [
    { name: 'Pancakes', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Omelette', price: '$7.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Pancakes', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Omelette', price: '$7.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Pancakes', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Omelette', price: '$7.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Pancakes', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Omelette', price: '$7.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Pancakes', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Omelette', price: '$7.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Pancakes', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Omelette', price: '$7.99', imageUrl: 'https://via.placeholder.com/150' },
    
  ],
  lunch: [
    { name: 'Burger', price: '$8.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Salad', price: '$6.99', imageUrl: 'https://via.placeholder.com/150' }
  ],
  dinner: [
    { name: 'Steak', price: '$14.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Pasta', price: '$12.99', imageUrl: 'https://via.placeholder.com/150' }
  ],
  beverages: [
    { name: 'Coffee', price: '$2.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Juice', price: '$3.99', imageUrl: 'https://via.placeholder.com/150' }
  ],
  desserts: [
    { name: 'Ice Cream', price: '$4.99', imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Cake', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' }
  ]
};

export default function LeftContent() {
  const [selectedCategory, setSelectedCategory] = useState('breakfast');

  return (
    <div className='content-left'>
      <div className='top-rectangle'>
        <div className='category-buttons'>
          {Object.keys(foodItems).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className='food-cards'>
        {foodItems[selectedCategory].map((item, index) => (
          <div className='food-card' key={index}>
            <img src={item.imageUrl} alt={item.name} />
            <div className='food-details'>
              <div className='food-name'>{item.name}</div>
              <div className='food-price'>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
