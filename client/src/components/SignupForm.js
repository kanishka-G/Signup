
import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Container, CssBaseline, Typography, Box } from '@mui/material';


const SignupForm = ({ onSignup }) => {
  const [name, setName] = useState('');
  
  const [phone , setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await api.post('/add-user', { name, phone , password });
      const { token , userId } = response.data;
      console.log({name, phone , password})
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', userId);
      console.log(userId);
      //onSignup();
      
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Signup failed:', error);
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
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone_number"
            autoComplete="phone"
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Box>
      </Box>

      
    </Container>
  );
};

export default SignupForm;
