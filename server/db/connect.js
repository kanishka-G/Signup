
const mongoose = require('mongoose');

require('dotenv').config();

const ConnectDB = (url) => {
  return mongoose.connect(url,)
  .then(() => {
    console.log('Connected to the DB...');
  })
  .catch((err) => {
    console.error('Error connecting to the DB:', err.message);
  });
}
module.exports = ConnectDB;
