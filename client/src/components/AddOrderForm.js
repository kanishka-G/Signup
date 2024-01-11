import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TextField, Button, Container, CssBaseline, Typography, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const AddOrderForm = () => {
  const [user_id, setUserId] = useState('');
  const [subTotal, setSubTotal] = useState('');
  const [phone, setPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    
    const storedUserId = localStorage.getItem('user_id');
    console.log('Stored User ID:', storedUserId);
    setUserId(storedUserId);
  }, []);

  const handleAddOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const requestData = { user_id, subTotal: Number(subTotal), phone };
      console.log('Request Data:', requestData);
      await api.post('/add-order', requestData, { headers: { Authorization: `Bearer ${token}` } });
      console.log('Order added successfully');
      setSuccessMessage('Order added successfully');
      setErrorMessage('');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Adding order failed:', error);
      setErrorMessage('Error adding order');
      setSuccessMessage('');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          Add Order
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
            disabled 
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="subTotal"
            label="Sub Total"
            name="subTotal"
            autoComplete="subTotal"
            type="number"
            value={subTotal}
            onChange={(e) => setSubTotal(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAddOrder}
          >
            Add Order
          </Button>
        </Box>
      </Box>

      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={successMessage ? 'success' : 'error'}
        >
          {successMessage || errorMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default AddOrderForm;
