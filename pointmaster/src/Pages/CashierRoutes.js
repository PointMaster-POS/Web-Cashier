import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import User from './User/User';
import Logs from './Logs/Logs';

function CashierRoutes() {
  return ( 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />   
      <Route path="/logs" element={<Logs />} />
    </Routes>
  );
}

export default CashierRoutes;
