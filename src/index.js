const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
const port = 5000;

// Connecting to MongoDB and creating one user
mongoose.connect('mongodb://127.0.0.1:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to the MongoDB database.');

    // Attempt to create a user
    try {
      const newUser = await User.create({
        username: 'booklover',
        password: 'read123' // In a real application, passwords should be hashed
      });
      console.log('User created successfully:', newUser);
    } catch (err) {
      if (err.code === 11000) {
        // Handle duplicate key error (e.g., username already exists)
        console.log('User already exists.');
      } else {
        // Handle other possible errors
        console.error('Error creating the user:', err);
      }
    }
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });

// Login route
app.get('/api/login', async (req, res) => {
  const { username, password } = req.query;

  // TODO: Find the user by username in the database
  // TODO: Verify if the found user's password matches the provided password
  try {
    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // In a real application, passwords should be hashed and compared securely
    if (user.password === password) {
      // Passwords match, authentication successful
      return res.json({ message: 'Login successful', user });
    } else {
      // Passwords do not match
      return res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (err) {
    console.error('Error finding user:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});