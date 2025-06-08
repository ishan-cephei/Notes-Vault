const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    return { success: true, message: "Connected to DB successfully" };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Error while connecting to DB",
    };
  }
};

module.exports = connectDB;
