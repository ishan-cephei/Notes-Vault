const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    required: [true, "Email is required"],
    unique: true,
    type: String,
    match: [/.+\@.+\..+/, "Please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
