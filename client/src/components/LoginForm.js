
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, CssBaseline, Typography, Box } from '@mui/material';

const LoginForm = ({ onLogin }) => {
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/login-user', { phone, password });
      const { token ,userId} = response.data;
      console.log('Received user ID:', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', userId);
      
      
      navigate('/dashboard');
      //onLogin();
      console.log("success mili hai")
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone_number"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            autoFocus
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
