const mongoose = require("mongoose");
const Movie = require("./movie");

const { Schema, model, Types } = mongoose;

const imiSchema = new Schema({
  itemId: { type: Types.ObjectId, ref: "Movie" },
  avalibleAmount: Number,
  soldAmount: Number,
  price: Number,
  retailPrice: Number,
});
const Imi = model("imi", imiSchema);

module.exports = Imi;
