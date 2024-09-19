import React, { createContext, useContext, useState } from 'react';

// Create a Context
const HomeContext = createContext();

// Custom hook to use the HomeContext
export const useHomeContext = () => {
  return useContext(HomeContext);
};

// Context Provider component
export const HomeProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [rightContent, setRightContent] = useState('RightContent');
  const [paymentInfo, setPaymentInfo] = useState({});

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <HomeContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        rightContent,
        setRightContent,
        paymentInfo,
        setPaymentInfo,
        handleAddItem,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
