import React, { useState, useEffect } from 'react';
import MainLayout from './Components/Dashboard/MainLayout';
import Login from './Components/Login/Login.js'; // Assuming your Login component is inside the components folder
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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
        {/* If the user is authenticated, show MainLayout; otherwise, show Login */}
        <Route
          path="/"
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={<Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
};

export default App;






