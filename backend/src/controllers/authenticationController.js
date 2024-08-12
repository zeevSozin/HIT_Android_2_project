const { generateJWT } = require("./../helpers/jwtMiddelware.js");
const {
  encrypt,
  compareHash,
} = require("./../helpers/encryptionMiddelware.js");
const logger = require("./../util/logger.js");
// const { saveOne } = require("./../helpers/dbContext.js");
const logger = require("./../util/logger.js");
const User = require("./../model/user");

const dbContext = new DbContext();

class AuthenticationController {
  constructor() {}
  dbContext = dbContext;

  async isUserexists(userEmail) {
    try {
      const result = await this.dbContext.select(User, {
        email: userEmail,
      });
      return result.lenght ? true : false;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    }
  }

  async registerNewUser(newUser, role) {
    try {
      const user = await dbContext.saveOne(User, { ...newUser, role: role });
      return user;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    }
  }
}
