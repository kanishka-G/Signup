import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Typography, Box, List, ListItem, ListItemText, Container, CssBaseline } from '@mui/material';

const OrderDetails = () => {
  const [user_id, setUserId] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);

  const handleGetOrderDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get(`/get-order?user_id=${user_id}`, { headers: { Authorization: `Bearer ${token}` } });
      setOrderDetails(response.data.orders);
    } catch (error) {
      console.error('Fetching order details failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h2" variant="h6">
          Order Details
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user_id"
            label="User ID"
            name="user_id"
            autoComplete="user_id"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGetOrderDetails}
          >
            Get Order Details
          </Button>
        </Box>
        <List>
          {orderDetails.map((order, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Order ID: ${order._id}, Sub Total: ${order.subTotal}, Phone Number: ${order.phone}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default OrderDetails;
