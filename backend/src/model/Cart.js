const mongoose = require("mongoose");
const Movie = require("./movie");
const { Schema, model, Types } = mongoose;

const cartSchema = new Schema({
  //   userId: { type: Types.ObjectId, ref: "User" },
  userId: String,
  //   itemIds: [{ type: Types.ObjectId, ref: "Movie" }],
  itemIds: [String],
});

const Cart = model("cart", cartSchema);

module.exports = Cart;
