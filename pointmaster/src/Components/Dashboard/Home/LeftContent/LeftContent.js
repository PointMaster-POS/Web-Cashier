import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HomeContext } from '../../../../Context/HomeContext';
import './leftcontent.css';
import baseUrl from 'src/apiConfig'; // Adjust this if you have absolute imports set up in your project.




export default function LeftContent() {
  const { handleAddItem } = useContext(HomeContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  const token = JSON.parse(localStorage.getItem('accessToken'));


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3003/cashier/inventory/categories', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response && response.data) {
          setCategories(response.data);
          if (response.data.length > 0) {
            setSelectedCategory(response.data[0].category_id);
          }
        } else {
          console.error('No data received for categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    if (token) {
      fetchCategories();
    } else {
      console.error('No access token found.');
    }
  }, [token]);
  
  useEffect(() => {
    if (selectedCategory) {
      const fetchProducts = async () => {
        try {
          console.log('Fetching products for category:', baseUrl);
          const response = await axios.get(`http://localhost:3003/cashier/inventory/products/${selectedCategory}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response);
  
          if (response && response.data) {
            setFoodItems(response.data);
          } else {
            console.error('No data received for products');
          }
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

  return (
    <div className='content-left'>
      <div className='top-rectangle'>
        <div className='category-buttons'>
          {categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category.category_id}
                onClick={() => handleCategoryClick(category.category_id)}
                className={selectedCategory === category.category_id ? 'selected' : ''}
              >
                {category.category_name}
              </button>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </div>
      </div>
      <div className='food-cards'>
        {foodItems.length > 0 ? (
          foodItems.map((item, index) => (
            <div className='food-card' key={index} onClick={() => handleAddItem(item)}>
              <img 
                src={item.image_url || 'placeholder.png'}  
                alt={item.item_name || 'Food item'} 
              />
              <div className='food-details'>
                <div className='food-name'>{item.item_name || 'Unknown item'}</div>
                <div className='food-price'>
                  {item.price ? `Rs.${item.price}` : 'Price not available'} 
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No food items available.</p>
        )}
      </div>
    </div>
  );
}
