const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
}

function generateJWT(data) {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(data, jwtSecretKey);
  return token;
}

module.exports = { authenticateJWT, generateJWT };
