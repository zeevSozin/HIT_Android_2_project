const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  active_cartId: String,
});

const User = model("user", userSchema);

module.exports = User;
