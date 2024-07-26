const express = require("express");
const { generateJWT } = require("./../helpers/jwtMiddelware.js");
const {
  encrypt,
  compareHash,
} = require("./../helpers/encryptionMiddelware.js");
const logger = require("./../util/logger.js");
// const { saveOne } = require("./../helpers/dbContext.js");
const DbContext = require("./../helpers/dbContext.js");
const User = require("./../model/user");

const router = express.Router();

const dbContext = new DbContext();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *    loginUser:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 *
 */

/**
 * @swagger
 * /authentication/register:
 *  post:
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *              properties:
 *                token:
 *                  type: string
 *                  exapmle: xyz...xzy
 *      406:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *              properties:
 *                error:
 *                  type: string
 *                  exapmle: UserName already taken
 *
 *      500:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *              properties:
 *                message:
 *                  type: string
 *                  exapmle: Internal server error
 *
 */

router.post("/register", encrypt, async (req, res) => {
  try {
    const result = await dbContext.select(User, {
      email: req.body.email,
    });
    if (!result.length) {
      await dbContext.saveOne(User, { ...req.body, role: "user" });
      const user = req.body;
      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: "user",
      };
      token = generateJWT(payload);
      res.status(201).json({ token: token });
    } else {
      res.status(406).json({ error: "UserName already taken" });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /authentication/validate:
 *  post:
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/loginUser'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *              properties:
 *                token:
 *                  type: string
 *                  exapmle: xyz...xzy
 *
 *
 *
 */

router.post("/validate", async (req, res) => {
  try {
    console.log("request body:", req.body);
    result = await dbContext.select(User, { email: req.body.email });
    const [user] = result;
    if (!user) {
      res.status(409).json({ error: "Wrong Username" });
    } else {
      console.log(user);
      console.log(req.body.password);
      compRes = await compareHash(req.body.password, user.password);
      console.log(compRes);
      if (!compRes) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        const payload = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };
        token = generateJWT(payload);

        token = generateJWT(payload);
        res.status(200).json({ token: token });
      }
    }
  } catch (error) {
    logger.error(error.message + error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
