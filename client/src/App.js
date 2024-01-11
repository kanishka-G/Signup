import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
// import AddOrderForm from './components/AddOrderForm';
// import OrderDetails from './components/OrderDetails';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={
          <>
            <LoginForm />
            <SignupForm />
          </>
        } />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
