import React, { createContext, useState } from 'react';

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [customerSelected, setCustomerSelected] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [rightContent, setRightContent] = useState('');

  const handleAddItem = (item) => {
    const newItem = {
      ...item, // Copy the item properties
      unique_id: `${item.item_id}-${new Date().getTime()}`, // Unique ID for each instance
      quantity: 1, // Start with a quantity of 1 for new instances
    };
    setSelectedItems([...selectedItems, newItem]); // Add new item with unique_id
  };
  

  const removeItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const increaseQuantity = (index) => {
    const newItems = [...selectedItems];
    newItems[index].quantity = (newItems[index].quantity || 1) + 1;
    setSelectedItems(newItems);
  };

  const decreaseQuantity = (index) => {
    const newItems = [...selectedItems];
    if ((newItems[index].quantity || 1) > 1) {
      newItems[index].quantity = (newItems[index].quantity || 1) - 1;
      setSelectedItems(newItems);
    }
  };

  const handleCustomerSelection = (customer) => {
    setCustomerDetails(customer);
    setCustomerSelected(true);
  };

  const resetCustomerSelection = () => {
    setCustomerDetails({});
    setCustomerSelected(false);
  };

  const setRightContentValue = (content) => {
    setRightContent(content);
  };

  // Add reset functionality to clear all relevant states
  const resetTransaction = () => {
    setSelectedItems([]);
    setCustomerDetails({});
    setCustomerSelected(false);
    setTotalAmount(0);
    setTotalDiscount(0);
    setRightContent('');
  };

  return (
    <HomeContext.Provider
      value={{
        selectedItems,
        handleAddItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        customerDetails,
        customerSelected,
        handleCustomerSelection,
        resetCustomerSelection,
        totalAmount,
        totalDiscount,
        setTotalAmount,
        setTotalDiscount,
        rightContent,
        setRightContent: setRightContentValue,
        resetTransaction,  
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
