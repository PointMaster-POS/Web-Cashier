import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './Components/Dashboard/MainLayout'; 
import Login from './Pages/Login/Login';
import Landing from './Pages/Landing/Landing'; 
import Home from './Pages/Dashboard/Home/Home'; 
import Logs from './Pages/Dashboard/Logs/Logs'; 

import { HomeContext } from './Context/HomeContext';

const App = () => {

  const {isAuthenticated, setIsAuthenticated, resetSelectedItems } = useContext(HomeContext);
 

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    // Check if token exists and if it's expired
    if (accessToken && tokenExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime < tokenExpiration) {
        setIsAuthenticated(true); // Token is valid
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tokenExpiration');
        setIsAuthenticated(false); // Token expired, force login
      }
    } else {
      setIsAuthenticated(false); // No token, must log in
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      resetSelectedItems();  
    }
  }, [isAuthenticated, resetSelectedItems]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
        />
        
        <Route
          path="/dashboard"
          element={isAuthenticated ? (
            <MainLayout />
          ) : <Navigate to="/login" />}
        >
          <Route path="" element={<Home />} />
          <Route path="logs" element={<Logs />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
