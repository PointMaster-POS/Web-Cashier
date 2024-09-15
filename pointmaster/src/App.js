import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './Components/Dashboard/MainLayout';
import Login from './Components/Login/Login';
import Landing from './Pages/Landing/Landing'; 

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

        {/* After successful login, navigate to /dashboard */}
        <Route 
          path="/dashboard/*" 
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />} 
        />

        {/* Redirect to landing if user tries to access other paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
