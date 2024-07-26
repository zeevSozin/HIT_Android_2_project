const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const purchaseSchema = new Schema({
  userId: String,
  itemIds: [String],
  date: { type: Date, default: Date.now },
});

const Purchase = model("purchase", purchaseSchema);

module.exports = Purchase;
