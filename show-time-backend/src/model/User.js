const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
});

const User = model("user", userSchema);

module.exports = User;
