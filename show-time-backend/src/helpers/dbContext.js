const mongoose = require("mongoose");
const config = require("config");
const logger = require("./../util/logger");
// const { model } = require("../model/user");

class DbContext {
  constructor() {
    this.connectionString = config.get("db.connectionstring");
  }
  async saveOne(model, data) {
    logger.debug("About to connect to DB");
    try {
      await mongoose.connect(this.connectionString);
      logger.log(
        "debug",
        "About to save entry to database with the detailes:\n data - %s",
        data
      );
      const entry = await model.create({ ...data });
      console.log("DBContext save one:", typeof entry, entry);
      return entry;
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }

  async saveMany(model, data) {
    logger.debug("About to connect to DB");
    try {
      await mongoose.connect(this.connectionString);
      const entries = await model.bulkSave([...data]);
      console.log("DBContext saveMany:", typeof entries, entries);
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }

  async select(model, predicate = null) {
    try {
      logger.debug("About to connect to DB");
      await mongoose.connect(this.connectionString);
      let result = null;
      if (predicate === null) {
        result = await model.find({});
      } else {
        console.log(predicate);
        result = await model.find(predicate).exec();
      }
      logger.debug("Query result is : %j", result);
      return result;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }

  async updateById(model, id, data) {
    try {
      logger.debug("About to connect to DB");
      await mongoose.connect(this.connectionString);
      const result = await model.findByIdAndUpdate({ _id: id }, data, {
        new: true,
      });
      logger.debug(result);
      return result;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }

  async updateOneAndUpsert(model, idMap, data) {
    try {
      logger.debug("About to connect to DB");
      await mongoose.connect(this.connectionString);
      const result = await model.findOneAndUpdate(idMap, data, {
        new: true,
        upsert: true,
      });
      logger.debug(result);
      return result;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }

  async deleteById(model, id) {
    try {
      logger.debug("About to connect to DB");
      await mongoose.connect(this.connectionString);
      const result = await model.findByIdAndDelete({ _id: id });
      logger.debug(result);
      return result;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }
}
module.exports = DbContext;
