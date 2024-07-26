const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const userHistorySchema = new Schema({
  userId: String,
  purchaseIds: [String],
});

const UserHistory = model("userHistory", userHistorySchema);

module.exports = UserHistory;
