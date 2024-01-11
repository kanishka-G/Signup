const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 


require('dotenv').config();




router.post('/add-user', async (req, res) => {
  try {
    const { name, phone, password } = req.body;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, phone, password: hashedPassword });
    await user.save();

    
    const userIdString = user._id.toString();
    console.log(userIdString);
    const token = jwt.sign({ user_id: userIdString }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token, userId: userIdString });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




router.post('/login-user', async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid phone number or password' });
    }

   
    const userIdString = user._id.toString();
    console.log(userIdString);
    const token = jwt.sign({ user_id: userIdString }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token , userId: userIdString  });
    
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
