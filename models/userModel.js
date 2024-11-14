const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      "Please enter a valid email",
    ],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [0, "Age cannot be less than 0"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
