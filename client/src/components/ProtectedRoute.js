import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; 

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate(); 
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); 
    }
  }, [navigate]); 

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
