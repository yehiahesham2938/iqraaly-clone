const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.authenticate = (request, response, next) => {
  const token = request.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return response.status(401).json({ 
      success: false, 
      message: 'Access denied. No token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

exports.authorize = (...roles) => {
  return (request, response, next) => {
    if (!roles.includes(request.user.subscription)) {
      return response.status(403).json({ 
        success: false, 
        message: 'Insufficient subscription level' 
      });
    }
    next();
  };
};