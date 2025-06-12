const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: "User already registered with this Email",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const createdUser = await User.create({
        email,
        password: hashedPassword,
        name,
      });
      const token = jwt.sign(
        { userId: createdUser._id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );
      res.status(201).json({
        success: true,
        data: {
          token,
          createdUser: { name: createdUser.name, email: createdUser.email },
        },
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
