const express = require("express");
const logger = require("./../util/logger");
const DbContext = require("../helpers/dbContext.js");
const Movie = require("../model/movie.js");
const Cart = require("./../model/cart.js");
const Purchase = require("./../model/purchase.js");
const UserHistory = require("./../model/userHistory.js");
const { Types } = require("mongoose");
const {
  updateItemAmounts,
  cartCheckOut,
  createCartForUser,
  updateCart,
  submitCart,
  getActiveCart,
} = require("./../controllers/cartController.js");
const router = express.Router();

const dbContext = new DbContext();

/**
 * @swagger
 * components:
 *  schemas:
 *    addCart:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        itemId:
 *          type: string
 *
 */

/**
 * @swagger
 * /cart/addItem:
 *  post:
 *    tags: [Cart]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/addCart'
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
 */

router.post("/addItem", async (req, res) => {
  try {
    logger.debug(" POST /cart/add request body: %j", req.body);
    const { userId, itemId } = req.body;
    // check if cart is exists in db
    let activeCartId = await getActiveCart(userId);
    logger.debug(
      " POST /cart/add - result after checking if cart exists %j",
      activeCartId
    );

    //if not exists craeate new cart with the item
    if (!activeCartId) {
      await createCartForUser(userId, itemId);
    } else {
      await updateCart(userId, itemId);
    }

    updateItemAmounts(itemId);

    res.status(201).json(cart);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * components:
 *  schemas:
 *    checkoutCart:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *        itemIds:
 *          type: [string]
 *
 */

/**
 * @swagger
 * /cart/checkout:
 *  post:
 *    tags: [Cart]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/checkoutCart'
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
 */

router.post("/checkout", async (req, res) => {
  try {
    logger.debug(" POST /checkout request payload: %j", req.body);
    const { userId, itemIds } = req.body;
    const result = await cartCheckOut(userId, itemIds);
    logger.debug(" POST /checkout response : %j", result);
    result && res.status(200).json({ message: "Sucess" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /cart/submit/{userId}:
 *  get:
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: User id
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
 */

router.get("/submit/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    logger.debug(" GET /submit/:userId request params: %s", userId);
    await submitCart(userId);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /cart/{userId}/{id}:
 *  delete:
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: User id
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: Item id
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
 */

router.delete("/:userId/:id", async (req, res) => {
  try {
    const userId = req.params.userId;
    const itemId = req.params.id;
    logger.debug(" DELETE /:userId/:id request params: %s,%s", userId, itemId);
    // check if cart exists
    let cart = await dbContext.select(Cart, { userId: userId });
    logger.debug(
      " DELETE /:userId/:id - result after checking if cart exists %j",
      cart
    );
    // if not return exception
    if (!cart.length) {
      res.status(406).json({ message: "Cart is no exsists" });
    }
    // if exists remove item id from cart entry ids
    else {
      cart = await dbContext.updateById(Cart, cart[0]._id, {
        // itemIds: [...cart[0].itemIds, itemId],
        $pull: { itemIds: itemId },
      });
      logger.debug(
        " DELETE /:userId/:id - result after removing item from cart %j",
        cart
      );
    }
    res.status(200).json(cart);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /cart/{userId}:
 *  delete:
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: User id
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
 */

router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    logger.debug(" DELETE /:userId request params: %s,%s", userId);
    // check if cart exists
    let cart = await dbContext.select(Cart, { userId: userId });
    logger.debug(
      " DELETE /:userId - result after checking if cart exists %j",
      cart
    );
    // if not return exception
    if (!cart.length) {
      res.status(406).json({ message: "Cart is no exsists" });
    } else {
      cart = await dbContext.updateById(Cart, cart[0]._id, {
        $set: { itemIds: [] },
      });
      logger.debug(
        " DELETE /:userId/:id - result after removing item from cart %j",
        cart
      );
    }
    res.status(200).json(cart);
    // if exists remove item id from cart entry ids
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
