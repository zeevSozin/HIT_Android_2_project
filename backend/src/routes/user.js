const express = require("express");
const { encrypt } = require("../helpers/encryptionMiddelware");
const logger = require("../util/logger");
const {
  getAllUsers,
  updateUser,
  changePassword,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * /user/users:
 *  get:
 *    tags: [User]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users:
 *                  type: array
 *                  items:
 *                    type: object
 */

router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users: users });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /user/edit:
 *  post:
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        applicatin/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users:
 *                  type: array
 *                  items:
 *                    type: object
 */

router.post("/edit", async (req, res) => {
  try {
    const user = req.body;
    logger.debug("userRouter - POST /edit - body content: %j", user);
    const updatedUser = await updateUser(user);
    logger.debug(
      "userRouter - POST /edit - after updating user: %j",
      updatedUser
    );
    res.status(200).json(updateUser);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /user/password:
 *  post:
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        applicatin/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                users:
 *                  type: array
 *                  items:
 *                    type: object
 */

router.post("/password", encrypt, async (req, res) => {
  try {
    const user = req.body;
    logger.debug("userRouter - POST /password - body content: %j", user);
    const updatedUser = await changePassword(user._id, user.password);
    logger.debug(
      "userRouter - POST /password - after updating password: %j",
      updatedUser
    );
    res.status(200).json(updateUser);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /user/{userId}:
 *  delete:
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: User id
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
 */

router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    logger.debug("userRouter - DELETE /:userId - params content: %s", userId);
    const result = await deleteUser(userId);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
