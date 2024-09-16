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

        {/* Redirect to /login if not authenticated */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} 
        />

        {/* Dashboard Layout with nested routes */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          {/* Define the child routes for the dashboard */}
          <Route path="" element={<Home />} />  {/* Default dashboard content */}
          <Route path="user" element={<User />} />
          <Route path="logs" element={<Logs />} />
        </Route>

        {/* Redirect to landing if user tries to access other paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
