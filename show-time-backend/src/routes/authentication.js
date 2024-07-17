const express = require("express");
const dotenv = require("dotenv");
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

dotenv.config();

const dbContext = new DbContext();

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - userName
 *        - password
 *      properties:
 *        userName:
 *          type: string
 *        password:
 *          type: string
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 */

/**
 * @swagger
 * /authentication/register:
 *  post:
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *              $ref: '#/components/schemas/User'
 *      406:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *              properties:
 *                message:
 *                  type: string
 *

 *
 *
 *
 *
 *
 */

router.post("/register", encrypt, async (req, res) => {
  try {
    const result = await dbContext.select(User, {
      userName: req.body.userName,
    });
    if (!result.length) {
      await dbContext.saveOne(User, req.body);
      res.status(201).send("OK");
    } else res.status(406).json({ message: "UserName already taken" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).send("Internal server error");
  }
});

/**
 * @swagger
 * /authentication/validate:
 *  post:
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/User'
 *
 *
 *
 */

router.post("/validate", async (req, res) => {
  try {
    console.log("request body:", req.body);
    result = await dbContext.select(User, { userName: req.body.userName });
    const [user] = result;
    console.log(user);
    console.log(req.body.password);
    compRes = await compareHash(req.body.password, user.password);
    console.log(compRes);
    if (!compRes) {
      ResizeObserverSize.status(401).json({ error: "Unauthorized" });
    }
    token = generateJWT(user.userName);
    res.status(200).send(token);
  } catch (error) {
    logger.error(error.message + error.stack);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
