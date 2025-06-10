const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(409).json({ success: false, message: "User Already Exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const createdUser = await User.create({
        email,
        password: hashedPassword,
        name,
      });
      res.status(201).json({
        success: true,
        data: createdUser,
        message: "User created successfully",
      });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({
        success: false,
        message: err.message || "Validation error while creating user",
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: err.message || "Server Error" });
    }
  }
};

module.exports = createUser;
