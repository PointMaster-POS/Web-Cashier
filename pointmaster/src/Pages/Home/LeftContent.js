import React, { useState } from 'react';
import './leftcontent.css';

export default function LeftContent({ onAddItem }) {
  const [selectedCategory, setSelectedCategory] = useState('breakfast');

  const foodItems = {
    breakfast: [
      { name: 'Waffles', price: '$6.99', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Waffles.webp` },
      { name: 'Avocado Toast', price: '$7.49', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Avocado Toast.webp` },
      { name: 'Smoothie Bowl', price: '$8.99', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Smoothie-Bowl.webp` },
      { name: 'French Toast', price: '$6.99', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/French-Toast.webp` },
      { name: 'Bagel with Cream Cheese', price: '$3.99', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Bagel with Cream Cheese.webp` },
      { name: 'Breakfast Burrito', price: '$8.49', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Breakfast Burrito.webp` },
      { name: 'chocolate waffles', price: '$8.99', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/chocolate waffles.webp` },
      { name: 'Granola with Yogurt', price: '$5.99', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Granola-with-Yogurt.webp` },
      { name: 'Eggs Benedict', price: '$9.99', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Eggs Benedict.webp` },
      { name: 'Pancakes', price: '$5.99', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Pancake.jpg` },
      { name: 'Omelette', price: '$7.99', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Omelette.webp` },
      { name: 'Breakfast Sandwich', price: '$6.49', imageUrl: `${process.env.PUBLIC_URL}/images/breakfast/Breakfast Sandwich.webp` }
    ],
    lunch: [
      { name: 'Burger', price: '$8.99', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/Burger.webp` },
      { name: 'Salad', price: '$6.99', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/Salad.webp` },
      { name: 'Grilled Chicken', price: '$7.99', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/Grilled Chicken Sandwich.webp` },
      { name: 'BLT', price: '$6.49', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/BLT.webp` },
      { name: 'Club Sandwich', price: '$8.49', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/Club Sandwich.webp` },
      { name: 'Caesar Salad', price: '$7.99', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/Caesar Salad.webp` },
      { name: 'Chicken Caesar Wrap', price: '$8.99', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/ChickenCaesarWrap.webp` },
      { name: 'Veggie Wrap', price: '$7.49', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/VeggieWrap.webp` },
      { name: 'Tuna Salad', price: '$6.99', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/TunaSalad.webp` },
      { name: 'Quesadilla', price: '$7.99', imageUrl: `${process.env.PUBLIC_URL}/images/lunch/Quesadilla.webp` }
    ],
    dinner: [
      { name: 'Steak', price: '$14.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Pasta', price: '$12.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Grilled Salmon', price: '$15.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Chicken Alfredo', price: '$13.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'BBQ Ribs', price: '$16.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Lasagna', price: '$11.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Chicken Stir-Fry', price: '$12.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Vegetarian Pizza', price: '$10.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Shrimp Scampi', price: '$14.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Lamb Chops', price: '$18.99', imageUrl: 'https://via.placeholder.com/150' }
    ],
    beverages: [
      { name: 'Coffee', price: '$2.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Juice', price: '$3.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Tea', price: '$2.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Soda', price: '$1.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Smoothie', price: '$4.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Milkshake', price: '$5.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Hot Chocolate', price: '$3.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Iced Coffee', price: '$3.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Lemonade', price: '$3.29', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Iced Tea', price: '$2.99', imageUrl: 'https://via.placeholder.com/150' }
    ],
    desserts: [
      { name: 'Ice Cream', price: '$4.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Cake', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Brownie', price: '$3.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Cheesecake', price: '$6.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Apple Pie', price: '$4.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Chocolate Chip Cookies', price: '$3.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Cupcake', price: '$2.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Pudding', price: '$3.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Mousse', price: '$4.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Fruit Tart', price: '$5.49', imageUrl: 'https://via.placeholder.com/150' }
    ],
    appetizers: [
      { name: 'Spring Rolls', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Chicken Wings', price: '$7.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Mozzarella Sticks', price: '$6.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Stuffed Mushrooms', price: '$7.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Nachos', price: '$8.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Bruschetta', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Potato Skins', price: '$6.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Garlic Bread', price: '$4.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Fried Calamari', price: '$9.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Onion Rings', price: '$4.99', imageUrl: 'https://via.placeholder.com/150' }
    ],
    soups: [
      { name: 'Tomato Soup', price: '$4.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Chicken Noodle Soup', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Minestrone', price: '$6.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Clam Chowder', price: '$7.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Beef Stew', price: '$8.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'French Onion Soup', price: '$6.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Lentil Soup', price: '$5.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Broccoli Cheddar Soup', price: '$6.99', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Chicken Tortilla Soup', price: '$7.49', imageUrl: 'https://via.placeholder.com/150' },
      { name: 'Butternut Squash Soup', price: '$5.99', imageUrl: 'https://via.placeholder.com/150' }
    ]
  };
  
  

  const handleAddItem = (item) => {
    onAddItem(item);
  };

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
          <div className='food-card' key={index} onClick={() => handleAddItem(item)}> {/* appending item to slected item array by handleAddItem function */ }
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
