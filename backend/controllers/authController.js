const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function (no change)
const generateToken = (id, role) => {
  return jwt.sign(
    { userId: id, role: role },
    process.env.JWT_SECRET,
    { expiresIn: '3d' }
  );
};

// 1. --- REGISTER (Updated for username) ---
exports.registerUser = async (req, res) => {
  try {
    // --- We now get 'username' instead of 'name' and 'email' ---
    const { username, password, role, committee } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ username }); // Find by username
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // 2. Create new user
    user = new User({
      username, // Set username
      password,
      role,
      committee,
    });

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save user to database
    await user.save();

    // 5. Send back a success message
    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// 2. --- LOGIN (Updated for username) ---
exports.loginUser = async (req, res) => {
  try {
    // --- We now get 'username' ---
    const { username, password, role } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ username }); // Find by username
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 2. Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Check if the role matches
    if (user.role !== role) {
      return res.status(400).json({ message: `You are not registered as a ${role}` });
    }

    // 4. Create and send back a token
    const token = generateToken(user._id, user.role);

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};