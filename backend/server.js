const app = require("./app");
const connectDB = require("./config/db.config");
require("dotenv").config();

const startServer = async () => {
  try {
    const response = await connectDB();
    if (response.success) {
      console.log(response.message);
      app.listen(3000, () => console.log("Server running at port 3000...."));
    } else {
      console.log(response.message);
      process.exit(1);
    }
  } catch (err) {
    console.log(err.message || "Something went wrong");
    process.exit(1);
  }
};

startServer();
