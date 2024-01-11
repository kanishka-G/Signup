const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const verifyToken = require('../middleware/verifyToken');


router.post('/add-order', verifyToken, async (req, res) => {
  try {
    const { subTotal, phone } = req.body;
    const user_id = req.user.user_id;
    console.log('backend ',user_id);
    

    const newOrder = new Order({
      user_id,
      subTotal,
      phone,
      
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order added successfully', order: savedOrder });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error adding order' });
  }
});


router.get('/get-order', verifyToken, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    

    const orders = await Order.find({ user_id: user_id });
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;
