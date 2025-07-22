const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  console.log('\n=== NEW REGISTRATION ATTEMPT ===');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
    const { username, email, password, fullName, college, year, branch } = req.body;


    if (!username || !email || !password || !fullName) {
      console.log('Validation failed - missing required fields');
      return res.status(400).json({ 
        message: 'Username, email, password and fullName are required' 
      });
    }

    console.log('Checking for existing user...');
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    
    if (existingUser) {
      console.log('Duplicate user found:', {
        existingUsername: existingUser.username,
        existingEmail: existingUser.email
      });
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    console.log('Creating new user instance...');
    const user = new User({
      username,
      email,
      password, 
      fullName,
      college,
      year,
      branch
    });

    console.log('User instance before save:', {
      id: user._id,
      username: user.username,
      email: user.email
    });

    console.log('Attempting to save user...');
    await user.save();
    console.log('User saved successfully:', {
      id: user._id,
      username: user.username,
      createdAt: user.createdAt
    });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    console.log('Registration successful for user:', user.username);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        college: user.college,
        year: user.year,
        branch: user.branch
      }
    });

  } catch (error) {
    console.error('!!! REGISTRATION ERROR !!!');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      console.log('Mongoose validation errors:', errors);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors 
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      console.log('Duplicate key error on field:', field);
      return res.status(400).json({ 
        message: `${field} already exists` 
      });
    }

    console.error('Unhandled error type:', error);
    res.status(500).json({ 
      message: 'Internal server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const login = async (req, res) => {
  console.log('\n=== LOGIN ATTEMPT ===');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Validation failed - email and password required');
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    console.log('Looking for user with email:', email);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(400).json({ 
        message: 'Invalid credentials' 
      });
    }

    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log('Password comparison failed for user:', user.username);
      return res.status(400).json({ 
        message: 'Invalid credentials' 
      });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    console.log('Login successful for user:', user.username);
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        college: user.college,
        year: user.year,
        branch: user.branch
      }
    });

  } catch (error) {
    console.error('!!! LOGIN ERROR !!!');
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Internal server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  register,
  login
};