const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { saveOne } = require("./../helpers/dbContext.js");
const User = require("./../model/user");
const router = express.Router();

dotenv.config();

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
 *                $ref: '#/components/schemas/User'
 *
 *
 *
 */

router.post("/register", async (req, res) => {
  console.log("request body:", req.body);
  await saveOne(User, req.body);
  res.status(200).send("OK");
});

module.exports = router;
