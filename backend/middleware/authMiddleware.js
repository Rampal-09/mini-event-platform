const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.log("error", err);
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
};

module.exports = auth;
