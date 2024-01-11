const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  subTotal: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minLength: 10
  },
  
});

module.exports = mongoose.model('Order', orderSchema);
