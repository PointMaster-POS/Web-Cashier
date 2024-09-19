import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './Components/Dashboard/MainLayout'; // Main dashboard layout
import Login from './Pages/Login/Login';
import Landing from './Pages/Landing/Landing'; 
import Home from './Pages/Home/Home'; // Home component
import User from './Pages/User/User'; // User component
import Logs from './Pages/Logs/Logs'; // Logs component
import { HomeProvider } from './Context/HomeContext'; // Import HomeProvider

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
            <HomeProvider> {/* Wrap MainLayout with HomeProvider */}
              <MainLayout />
            </HomeProvider>
          ) : <Navigate to="/login" />}
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
