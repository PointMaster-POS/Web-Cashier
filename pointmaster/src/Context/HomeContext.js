import React, { createContext, useState } from 'react';

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [customerSelected, setCustomerSelected] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [rightContent, setRightContent] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAddItem = (item) => {
    const newItem = {
      ...item, 
      unique_id: `${item.item_id}-${new Date().getTime()}`, 
      quantity: 1, 
    };
    setSelectedItems([...selectedItems, newItem]); 
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
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
