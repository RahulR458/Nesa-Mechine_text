const User = require("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

      // Manual validation for name, email, and age
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ success: false, message: "Name is required and must be a non-empty string." });
      }
  
      const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Please provide a valid email address." });
      }
  
      if (age == null || isNaN(Number(age)) || Number(age) < 0) {
        return res.status(400).json({ success: false, message: "Age is required and must be a non-negative integer." });
      }
  
      // Check if email already exists 
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already exists." });
      }

    const newUser = new User({ name, email, age });
    const savedUser = await newUser.save();

    // Check if the user is not saved for any reason (very unlikely to happen)
    if (!savedUser) {
      throw new Error("User is not created.");
    }

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};


// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    // validation for user, if user is exist?
    if (!users) {
      return res.status(400).json({ success: false, message: "User is not exists." });
    }

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update user
exports.updateUser = async (req, res) => {
  console.log(req.query.id)
  try {
    const { name, email, age } = req.body;

    const isExist = await User.findById(req.query.id);

    // validation for user, if user is exist?
    if (!isExist) {
      return res.status(400).json({ success: false, message: "User is not exists." });
    }

    const user = await User.findByIdAndUpdate(
      req.query.id,
      { name, email, age },
      { new: true}
    );
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {

    const isExist = await User.findById(req.query.id);

    // validation for user, if user is exist?
    if (!isExist) {
      return res.status(400).json({ success: false, message: "User is not exists." });
    }

    const user = await User.findByIdAndDelete(req.query.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};