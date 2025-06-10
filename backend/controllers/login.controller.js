const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(401).json({ success: false, message: "Incorrect Password" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: err.message || "Something went wrong" });
  }
};

module.exports = loginUser;
