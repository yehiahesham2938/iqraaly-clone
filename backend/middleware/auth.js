const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach the decoded user info to the request
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
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