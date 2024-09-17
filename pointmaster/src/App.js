import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './Components/Dashboard/MainLayout'; // Main dashboard layout
import Login from './Pages/Login/Login';
import Landing from './Pages/Landing/Landing'; 
import Home from './Pages/Home/Home'; // Home component
import User from './Pages/User/User'; // User component
import Logs from './Pages/Logs/Logs'; // Logs component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkTokenValidity = () => {
      const accessToken = localStorage.getItem('accessToken');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      if (accessToken && tokenExpiration) {
        const currentTime = new Date().getTime();
        if (currentTime < parseInt(tokenExpiration, 10)) {
          setIsAuthenticated(true); // Token is valid
        } else {
          // Token expired, clear local storage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('tokenExpiration');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false); // No token found
      }
    };

    checkTokenValidity();

    // Optional: Re-run token validation on route changes
    const handleRouteChange = () => checkTokenValidity();
    window.addEventListener("popstate", handleRouteChange); // Listen for navigation events

    return () => window.removeEventListener("popstate", handleRouteChange); // Cleanup on unmount
  }, []);

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
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route path="" element={<Home />} />
          <Route path="user" element={<User />} />
          <Route path="logs" element={<Logs />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
