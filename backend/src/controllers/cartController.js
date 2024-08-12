const logger = require("./../util/logger.js");
const DbContext = require("../helpers/dbContext.js");
const Movie = require("./../model/movie.js");
const Cart = require("./../model/cart.js");
const User = require("./../model/user.js");
const Purchase = require("../model/purchase.js");
const UserHistory = require("../model/userHistory.js");
const { use } = require("../routes/cart.js");

const dbContext = new DbContext();

// Utill functions

async function getActiveCart(userId) {
  logger.debug(
    "cartController - getActiveCart(userId) - invoked with userId: %s",
    userId
  );
  const user = await dbContext.select(User, { _id: userId });
  logger.debug(
    "cartController - getActiveCart(userId) - returned user: %j",
    user
  );
  const userActiveCartId = user[0].active_cartId;
  return userActiveCartId;
}

async function createUserCart(userId) {
  try {
    const newCartEntry = { userId: userId, itemIds: [] };
    const newCart = await dbContext.saveOne(Cart, newCartEntry);
    logger.debug(
      " cartController - createUserCart - created new cart: %j",
      newCart
    );
    // update user with active cart id

    const updatedUser = await dbContext.updateById(User, userId, {
      $set: { active_cartId: newCart._id },
    });
    logger.debug(
      " cartController - createUserCart - updated user: %j",
      updatedUser
    );
    return newCart;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

async function updateCartContent(cartId, itemIds) {
  try {
    logger.debug(
      " cartController - about to updateCartContent(cartId, itemIds)  with cartId: %s and itemIds:%j",
      cartId,
      itemIds
    );
    const updatedCart = dbContext.updateById(Cart, cartId, {
      $set: { itemIds: itemIds },
    });
    logger.debug(
      " cartController - updateCartContent(cartId, itemIds) updated the cart: %j",
      updatedCart
    );
    return updatedCart;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

// Controller functions

const cartCheckOut = async (userId, movieIds) => {
  try {
    let userActiveCartId = await getActiveCart(userId);
    if (!userActiveCartId) {
      // create cart for user
      userCart = await createUserCart(userId);
      userActiveCartId = userCart._id;
    }
    // update cart content
    const updatedCart = await updateCartContent(userActiveCartId, movieIds);
    return updatedCart;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

//TODO: Buid a function to return cart by cartId

const updateItemAmounts = async (movieIds) => {
  try {
    logger.debug(
      " About to updateItemAmounts(movieIds) with movieids: %j",
      movieIds
    );
    if (movieIds.length) {
      for (const movieId of movieIds) {
        const res = await dbContext.updateById(Movie, movieId, {
          $inc: { avalibleAmount: -1, soldAmount: 1 },
        });
        logger.debug("After updating the amounts:%j", res);
      }
    }
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

//TODO: Create an new cart and append to the user an active cart id, then append items

const createCartForUser = async (userId, movieIds) => {
  try {
    logger.debug(
      " cartController - createCartForUser(userId, movieIds) invoked with - userId: %s movieIds %j",
      userId,
      movieIds
    );
    const movieIdsSet = new Set();
    movieIds.forEach((element) => {
      movieIdsSet.add(element);
    });
    const newCartContent = {
      userId: userId,
      itemIds: [...movieIds],
    };

    const newCart = await dbContext.saveOne(Cart, newCartContent);
    logger.debug(
      " cartController - createCartForUser - created new cart: %j",
      newCart
    );
    // update user with active cart id

    const updatedUser = await dbContext.updateById(User, userId, {
      $set: { active_cartId: newCart._id },
    });
    logger.debug(
      " cartController - createCartForUser - updated user: %j",
      newCart
    );
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const updateCart = async (userId, movieIds) => {
  try {
    logger.debug(
      "cartController - updateCart(userId, movieIds) invoked with - userId: %s movieIds %j",
      userId,
      movieIds
    );
    // get the active cart of the user
    const userActiveCartId = getActiveCart(userId);
    // Update the list of the movieIds
    // Get the cart of the user
    const userCart = await dbContext.select(Cart, { _id: userActiveCartId });
    logger.debug(
      "cartController - updateCart(userId, movieIds) - got User's Active car from db: %j",
      userCart
    );

    // Get the movie ids of the cart
    // const userCartMovieIds = userCart.itemIds;

    // Add the movie ids of the catr to a set and add also the movieIds parameter to the set
    const movieIdsSet = new Set();
    // userCartMovieIds.forEach((element) => movieIdsSet.add(element));
    movieIds.forEach((element) => {
      movieIdsSet.add(element);
    });
    // Update the users active cart witht the content of the movieId set
    const updatedCart = await dbContext.updateById(Cart, userActiveCartId, {
      $set: { itemIds: [...movieIdsSet] },
    });
    logger.debug(
      "cartController - updateCart(userId, movieIds) - Updated cart is: %j",
      updatedCart
    );
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const submitCart = async (userId) => {
  try {
    logger.debug(
      "cartController - submitCart(userId) invoked with - userId: %s ",
      userId
    );
    // Get the active cart of the user
    const userActiveCartId = await getActiveCart(userId);
    //Get the cart
    const userCart = await dbContext.select(Cart, { _id: userActiveCartId });
    logger.debug(
      "cartController - submitCart(userId) - got User's Active car from db: %j",
      userCart
    );

    // Get the movie ids of the cart
    const userCartMovieIds = userCart[0].itemIds;
    // Create a putchse with assosiate carts
    const newPurchasePayload = {
      userId: userId,
      itemIds: userCartMovieIds,
    };
    const newPurchase = await dbContext.saveOne(Purchase, newPurchasePayload);

    logger.debug(
      "cartController - submitCart(userId) - Created a new purchase: %j",
      newPurchase
    );

    // append the purchase to the user history
    // check if the userHistory exists
    const userExistingUserHisory = await dbContext.select(UserHistory, {
      userId: userId,
    });
    logger.debug(
      "cartController - submitCart(userId) - Check if userHistory exists and recived: %j",
      userExistingUserHisory
    );

    // if not exists Upsert
    if (!userExistingUserHisory.length) {
      const userHistoryPayload = {
        userId: userId,
        putchaseIds: [newPurchase._id],
      };
      const userHistory = await dbContext.updateOneAndUpsert(
        UserHistory,
        { userId: userId },
        userHistoryPayload
      );
      logger.debug(
        "cartController - submitCart(userId) - After upserting new user history record: %j",
        userHistory
      );
    }
    // if exists add the putchaseId to the arry
    else {
      const userHistory = await dbContext.updateById(
        UserHistory,
        userExistingUserHisory[0]._id,
        { $push: { purchaseIds: newPurchase._id } }
      );
      logger.debug(
        "cartController - submitCart(userId) -  After adding new user history purchaseId: %j",
        userHistory
      );
    }
    // update items amount
    await updateItemAmounts(userCartMovieIds);

    // Update the user's active cart id to null
    const updatedUser = await dbContext.updateById(User, userId, {
      $set: { active_cartId: null },
    });
    logger.debug(
      "cartController - submitCart(userId) -  After seting user's acrive cart: %j",
      updatedUser
    );
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

module.exports = {
  cartCheckOut,
  updateItemAmounts,
  createCartForUser,
  getActiveCart,
  updateCart,
  submitCart,
};
