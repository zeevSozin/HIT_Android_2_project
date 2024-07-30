const jwt = require("jsonwebtoken");

const signOptions = {
  expiresIn: "12h",
  algorithm: "RS256",
};

const verifyOptions = {
  expiresIn: "12h",
  algorithm: ["RS256"],
};

function authenticateJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_PUBLIC_KEY, verifyOptions, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
}

function generateJWT(data) {
  const jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign({ ...data }, jwtPrivateKey, signOptions);
  return token;
}

module.exports = { authenticateJWT, generateJWT };
