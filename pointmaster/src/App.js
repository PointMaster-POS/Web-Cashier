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

  // Check localStorage for token on load
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);  // Explicitly set false if no token exists
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login Page */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
        />

        {/* Dashboard with Nested Routes */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route path="" element={<Home />} />  {/* Default dashboard content */}
          <Route path="user" element={<User />} />
          <Route path="logs" element={<Logs />} />
        </Route>

        {/* Redirect other paths to Landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
