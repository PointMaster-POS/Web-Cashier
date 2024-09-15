import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './leftcontent.css';

export default function LeftContent({ onAddItem }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  // Get the access token from localStorage
  const token = JSON.parse(localStorage.getItem('accessToken'));

  // Fetch categories from the API with the access token
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3003/cashier/inventory/categories', {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the headers
          }
        });
        setCategories(response.data);
        if (response.data.length > 0) {
          // select the first category
          setSelectedCategory(response.data[0].category_id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [token]);

  // Fetch products for the selected category
  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`http://localhost:3003/cashier/inventory/products/${selectedCategory}`, {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          });
          setFoodItems(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProducts();
    }
  }, [selectedCategory, token]);

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
            {/* <img 
              src={item.image_url ? item.image_url : 'placeholder.png'}  // Handle missing image URL
              alt={item.item_name} 
            /> */}

            <img src={item.image_url} alt={item.name} />
            <div className='food-details'>
              <div className='food-name'>{item.item_name}</div>
              <div className='food-price'>
                {item.price ? `$${item.price}` : 'Price not available'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
