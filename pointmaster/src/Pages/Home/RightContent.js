import React, { useState, useEffect } from 'react';
import './rightcontent.css';
import { PlusOutlined, MinusOutlined, CloseOutlined, PauseOutlined, ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";

export default function RightContent({ selectedItems, setSelectedItems }) {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const amount = selectedItems.reduce((acc, item) => {
      const price = parseFloat(item.price.slice(1)) || 0;
      return acc + (item.quantity || 0) * price;
    }, 0);
    const discountAmount = amount * 0.1; // Example: 10% discount
    setTotalAmount(amount - discountAmount);
    setDiscount(discountAmount);
  }, [selectedItems]);

  const removeItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const increaseQuantity = (index) => {
    const newItems = [...selectedItems];
    newItems[index].quantity = (newItems[index].quantity || 0) + 1;
    setSelectedItems(newItems);
  };

  const decreaseQuantity = (index) => {
    const newItems = [...selectedItems];
    if ((newItems[index].quantity || 1) > 1) {
      newItems[index].quantity = (newItems[index].quantity || 1) - 1;
      setSelectedItems(newItems);
    }
  };

  return (
    <div className='content-right'>
      <div className='add-customer'>
        <button><PlusOutlined /> Add Customer</button>
      </div>
      <div className='selected-items'>
        {selectedItems.map((item, index) => {
          // Ensure each item has a quantity of 1 if it's not already set
          if (!item.quantity) {
            item.quantity = 1;
          }

          const price = parseFloat(item.price.slice(1)) || 0;
          const quantity = item.quantity || 0;
          const total = (quantity * price).toFixed(2);
  
          return (
            <div className='selected-item-card' key={index}>
              <div className='item-name'>{item.name}</div>
              <div className='item-details'>
                <span className='item-price'>
                  {isNaN(price) ? 'Invalid Price' : `$${price.toFixed(2)} / unit`}
                </span>
                <div className='quantity-controls'>
                  <button onClick={() => decreaseQuantity(index)}><MinusOutlined /></button>
                  <span>{quantity}</span>
                  <button onClick={() => increaseQuantity(index)}><PlusOutlined /></button>
                </div>
                <span className='item-discount'>
                  {isNaN(discount) ? 'Invalid Discount' : `$${discount.toFixed(2)}`}
                </span>
                <span className='item-total'>
                  {isNaN(total) ? 'Invalid Total' : `$${total}`}
                </span>
              </div>
              <button className='remove-item' onClick={() => removeItem(index)}><CloseOutlined /></button>
            </div>
          );
        })}
      </div>
      <div className='order-summary'>
        <div className='summary-row'>
          <span>Subtotal:</span>
          <span>${(totalAmount + discount).toFixed(2)}</span>
        </div>
        <div className='summary-row'>
          <span>Tax:</span>
          <span>$45.00</span> {/* Replace this with actual tax calculation */}
        </div>
        <div className='summary-row'>
          <span>Payable Amount:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
      <div className='order-actions'>
        <button className='hold-order'><PauseOutlined /> Hold Order</button>
        <button className='proceed'><CheckOutlined />Proceed</button>
      </div>
    </div>
  );
}
