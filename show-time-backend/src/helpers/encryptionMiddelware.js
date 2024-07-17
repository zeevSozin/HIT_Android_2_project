const bcrypt = require("bcrypt");
const logger = require("../util/logger");
const saltRounds = 10;

async function encrypt(req, res, next) {
  let password = req.body.password;
  const hash = await bcrypt.hash(password, saltRounds);

  req.body.password = hash;
  next();
}

async function compareHash(plainPassword, hash) {
  try {
    return await bcrypt.compare(plainPassword, hash);
  } catch (error) {
    logger.error(error.message + error.stack);
  }
}

module.exports = { encrypt, compareHash };
