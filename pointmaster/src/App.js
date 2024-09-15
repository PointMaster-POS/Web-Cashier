import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './Components/Dashboard/MainLayout';
import Login from './Components/Login/Login';
import Landing from './Pages/Landing/Landing'; // Import the Landing component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated (e.g., from localStorage)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Display Landing Page first */}
        <Route path="/" element={<Landing />} />

        {/* After successful login, navigate to MainLayout */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        />

        {/* Login Route */}
        <Route
          path="/login"
          element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
