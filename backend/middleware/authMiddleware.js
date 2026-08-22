console.log("AUTH MIDDLEWARE HIT");
const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log("No Authorization header");
    return res.status(401).json({ msg: "No token" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("Token missing after Bearer");
    return res.status(401).json({ msg: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ msg: "Invalid token" });
  }
};