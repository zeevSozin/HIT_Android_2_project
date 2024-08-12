const logger = require("../util/logger");
const DbContext = require("../helpers/dbContext");
const User = require("../model/user");

const dbContext = new DbContext();

// Get all users except Admin
async function getAllUsers() {
  try {
    logger.debug("userController - getAllUsers() invoked");
    const users = await dbContext.select(User);
    const usersWithoutAdmin = users.map((user) => {
      if (user.role !== "admin") return user;
    });
    return usersWithoutAdmin;
  } catch (error) {
    logger.error("ERROR: userController - getAllUsers(): %j", error);
    throw error;
  }
}

// Add new user => register

// Edit user
async function updateUser(user) {
  try {
    logger.debug(
      "userController - updateUser(user) invoked with user: %j",
      user
    );
    const updatedUser = await dbContext.updateById(User, user._id, user);
    logger.debug(
      "userController - updateUser(user) updated user: %j",
      updatedUser
    );
    return updatedUser;
  } catch (error) {
    logger.error("ERROR: userController - updateUser(user): %j", error);
    throw error;
  }
}

// Reset password

async function changePassword(userId, newPassword) {
  try {
    logger.debug(
      "userController - changePassword(userId, newPassword) invoked with userId: %s, and new password: %s",
      userId,
      newPassword
    );
    const updatedUser = await dbContext.updateById(User, userId, {
      $set: { password: newPassword },
    });
    logger.debug(
      "userController - changePassword(userId, newPassword) updated user: %j",
      updatedUser
    );
  } catch (error) {
    logger.error(
      "ERROR: userController - changePassword(userId, newPassword): %j",
      error
    );
    throw error;
  }
}

// Delete User
async function deleteUser(userId) {
  try {
    logger.debug(
      "userController - deleteUser(userId) invoked with userId: %s",
      userId
    );
    const result = await dbContext.deleteById(User, userId);
    logger.debug(
      "userController - deleteUser(userId) deleted user: %j",
      result
    );
  } catch (error) {
    logger.error("ERROR: userController - deleteUser(userId): %j", error);
    throw error;
  }
}

module.exports = {
  getAllUsers,
  updateUser,
  changePassword,
  deleteUser,
};
