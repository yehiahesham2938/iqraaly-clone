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

    if (!username || !email || !password) {
      return handleError(response, 400, 'Username, email and password are required');
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return handleError(response, 400, 'Username or email already exists');
    }

    const user = new User({
      username,
      email,
      password,  
      subscription_status: 'free'
    });

    await user.save();

    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        subscription: user.subscription_status 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

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

    const user = await User.findOne({ email });
    if (!user) {
      return handleError(response, 401, 'Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return handleError(response, 401, 'Invalid email or password');
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        username: user.username,
        subscription: user.subscription_status 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
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
exports.updateProfile = async (req, res) => {
  console.log('PUT /api/auth/profile called'); // Log when the route is hit
  console.log('Authenticated user:', req.user); // Log the user object

  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { username, email, profile_picture } = req.body;

    if (!username || !email) {
      return res.status(400).json({ success: false, message: 'Username and email are required' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, profile_picture },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};