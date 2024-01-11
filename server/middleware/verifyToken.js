const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Unauthorized: Token has expired' });
      }
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = {
      user_id: decoded.user_id
    };

    console.log('Request Path:', req.path);
    console.log('Decoded User ID:', req.user.user_id);

    
    if (req.path === '/add-order' && req.body.user_id !== req.user.user_id) {
      return res.status(401).json({ message: 'Unauthorized: Invalid user ID' });
    }

    next();
  });
};

module.exports = verifyToken;
