const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginUser = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password, name } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ success: false, message: "User doesn't exist" });
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({ success: false, message: "Incorrect Password" });
      return;
    }
    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
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
