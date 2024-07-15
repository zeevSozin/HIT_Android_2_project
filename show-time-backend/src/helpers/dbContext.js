const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(config.get("db.connectionstring"));

async function saveOne(schema, data) {
  console.log("about to save to mongo: \n", schema, data);
  const entry = new schema({ ...data });
  console.log(entry);
  await entry.save();
}

module.exports = {
  saveOne,
};
