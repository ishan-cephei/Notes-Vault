const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed",
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = payload;

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message:
        err.name === "TokenExpiredError"
          ? "Session expired. Please login again."
          : err.message || "Authentication failed.",
    });
  }
};

module.exports = authenticate;
