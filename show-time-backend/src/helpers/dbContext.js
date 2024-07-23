const mongoose = require("mongoose");
const config = require("config");
const logger = require("./../util/logger");
const { schema } = require("../model/user");

class DbContext {
  constructor() {
    this.connectionString = config.get("db.connectionstring");
  }
  async saveOne(schema, data) {
    logger.debug("About to connect to DB");
    try {
      await mongoose.connect(this.connectionString);
      const entry = new schema({ ...data });
      logger.log(
        "debug",
        "About to save entry to database with the detailes:\n data - %s",
        data
      );
      await entry.save();
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }

  async saveMany(schema, data) {
    logger.debug("About to connect to DB");
    try {
      await mongoose.connect(this.connectionString);
      await schema.insertMany([...data]);
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }

  async select(schema, predicate = null) {
    try {
      logger.debug("About to connect to DB");
      await mongoose.connect(this.connectionString);
      let result = null;
      if (predicate === null) {
        result = await schema.find({});
      } else {
        console.log(predicate);
        result = await schema.find(predicate);
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

  async updateById(schema, id, data) {
    try {
      logger.debug("About to connect to DB");
      await mongoose.connect(this.connectionString);
      result = await schema.findByIdAndUpdate(id, data);
      logger.debug(result);
      return result;
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }

  async deleteById(schema, id) {
    try {
      logger.debug("About to connect to DB");
      await mongoose.connect(this.connectionString);
      result = await schema.findByIdAndremove(id);
      logger.debug(result);
    } catch (error) {
      logger.error(error.message);
      throw new Error(error);
    } finally {
      mongoose.connection.close();
    }
  }
}
module.exports = DbContext;
