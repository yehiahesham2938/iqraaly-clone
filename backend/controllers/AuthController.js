const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { JWT_SECRET } = process.env; 


const handleError = (response, status, message) => {
  return response.status(status).json({ 
    success: false, 
    message 
  });
};


const handleSuccess = (response, status, data) => {
  return response.status(status).json({ 
    success: true, 
    ...data 
  });
};



exports.register = async (request, response) => {
  try {
    const { username, email, password } = request.body;

    // Validate input
    if (!username || !email || !password) {
      return handleError(response, 400, 'Username, email and password are required');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return handleError(response, 400, 'Username or email already exists');
    }

    // Create new user
    const user = new User({
      username,
      email,
      password, // Password will be hashed by the pre-save middleware
      subscription_status: 'free'
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        subscription: user.subscription_status 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    // Return success response
    return handleSuccess(response, 201, { 
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        subscription: user.subscription_status
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return handleError(response, 500, 'Internal server error');
  }
};

exports.login = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return handleError(response, 401, 'Invalid email or password');
    }

    // Compare passwords using the model method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return handleError(response, 401, 'Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        subscription: user.subscription_status 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response
    return handleSuccess(response, 200, {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        subscription: user.subscription_status
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return handleError(response, 500, 'Internal server error');
  }
};

exports.getProfile = async (request, response) => {
  try {
    const user = await User.findById(request.user.userId)
      .select('-password -__v');

    if (!user) {
      return handleError(response, 404, 'User not found');
    }

    return handleSuccess(response, 200, { user });
  } catch (error) {
    console.error('Profile error:', error);
    return handleError(response, 500, 'Internal server error');
  }
};