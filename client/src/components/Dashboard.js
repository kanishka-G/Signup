// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import AddOrderForm from './AddOrderForm';
import OrderDetails from './OrderDetails';
import Logout from './Logout';

const Dashboard = () => {
  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <div>
        <AddOrderForm/>
      </div>
      <div>
        <OrderDetails/>
      </div>
      <div>
        <Logout/>
      </div>
    </div>
  );
};

export default Dashboard;
