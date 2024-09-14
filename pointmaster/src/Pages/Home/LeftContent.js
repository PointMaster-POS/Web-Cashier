import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './leftcontent.css';

export default function LeftContent({ onAddItem }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3003/cashier/inventory/categories');
        setCategories(response.data);
        if (response.data.length > 0) {
          // Automatically select the first category
          setSelectedCategory(response.data[0].category_id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products for the selected category
  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:3003/cashier/inventory/products/2076ef49-7188-11ef-8928-0242ac120002`);
          setFoodItems(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category_id) => {
    setSelectedCategory(category_id);
  };

  const handleAddItem = (item) => {
    onAddItem(item);
  };

  return (
    <div className='content-left'>
      <div className='top-rectangle'>
        <div className='category-buttons'>
          {categories.map((category) => (
            <button
              key={category.category_id}
              onClick={() => handleCategoryClick(category.category_id)}
            >
              {category.category_name}
            </button>
          ))}
        </div>
      </div>
      <div className='food-cards'>
        {foodItems.map((item, index) => (
          <div className='food-card' key={index} onClick={() => handleAddItem(item)}>
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
