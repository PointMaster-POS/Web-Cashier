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
  const [holdBillData, setHoldBillData] = useState(null);

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

  const removeItemHold = (index) => {
    if (!holdBillData.items[index]) return; // Check if item exists
  
    const newItems = [...holdBillData.items];
    newItems.splice(index, 1); // Remove the item at the specified index
  
    setHoldBillData({
      ...holdBillData,
      items: newItems, // Update the holdBillData with the new items array
    });
  };
  

  const increaseQuantity = (index) => {
    const newItems = [...selectedItems];
    newItems[index].quantity = (newItems[index].quantity || 1) + 1;
    setSelectedItems(newItems);
  };

  const increaseQuantityHold = (index) => {
    if (!holdBillData.items[index]) return; // Check if item exists
    let newItems = [...holdBillData.items];
    if (newItems[index].quantity) {
      newItems[index].quantity += 1;
    } else {
      newItems[index].quantity = 1; // Set a default value if undefined
    }
    setHoldBillData({
      ...holdBillData,
      items: newItems,
    });
  };

  const decreaseQuantity = (index) => {
    const newItems = [...selectedItems];
    if ((newItems[index].quantity || 1) > 1) {
      newItems[index].quantity = (newItems[index].quantity || 1) - 1;
      setSelectedItems(newItems);
    }
  };

  const decreaseQuantityHold = (index) => {
    if (!holdBillData.items[index]) return; // Check if item exists
    let newItems = [...holdBillData.items];
    if (newItems[index].quantity && newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
    } else {
      newItems[index].quantity = 1; 
    }
    setHoldBillData({
      ...holdBillData,
      items: newItems,
    });
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

  const updateHoldBillData = (data) => {
    setHoldBillData(data); // Function to update hold bill data
  };

  
  const resetTransaction = () => {
    setHoldBillData([]);
    setSelectedItems([]);
    setCustomerDetails({});
    setCustomerSelected(false);
    setTotalAmount(0);
    setTotalDiscount(0);
    setRightContent('');
  };

  const resetSelectedItems = () => {
    setSelectedItems([]);
  };

  // New function to set history bill details
  const setHistoryDetails = (items, customer) => {
    setSelectedItems(items);
    setCustomerDetails(customer);
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
        setRightContent,
        setRightContentValue,
        resetTransaction,  
        isAuthenticated,
        setIsAuthenticated,
        holdBillData,
        updateHoldBillData,
        resetSelectedItems,
        setHistoryDetails,
        increaseQuantityHold,
        decreaseQuantityHold,
        removeItemHold,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
