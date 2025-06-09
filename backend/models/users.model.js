const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
});

const User = mongoose.model("User", usersSchema);
module.exports = User;
