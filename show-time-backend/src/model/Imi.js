const mongoose = require("mongoose");
const Movie = require("./Movie");

const { Schema, model, Types } = mongoose;

const imiSchema = new Schema({
  itemId: { type: Types.ObjectId, ref: "Movie" },
  avalibleAmount: Number,
  soldAmount: Number,
  Price: Number,
  retailPrice: Number,
});
const Imi = model("imi", imiSchema);

module.exports = Imi;
