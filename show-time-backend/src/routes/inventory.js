const express = require("express");
const dotenv = require("dotenv");
const logger = require("../util/logger.js");
const DbContext = require("../helpers/dbContext.js");
const Movie = require("../model/movie.js");
const router = express.Router();

const dbContext = new DbContext();

/**
 * @swagger
 *  components:
 *    schemas:
 *      Movie:
 *         adult:
 *           type: boolean
 *         backdrop_path:
 *           type: string
 *           example: /zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg
 *         genre_ids:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               0:
 *                 type: string
 *                 example: D
 *               1:
 *                 type: string
 *                 example: r
 *               2:
 *                 type: string
 *                 example: a
 *               3:
 *                 type: string
 *                 example: m
 *               4:
 *                 type: string
 *                 example: a
 *           example: [
 *             Drama
 *           ]
 *         id:
 *           type: integer
 *           format: int32
 *           example: 278
 *         original_language:
 *           type: string
 *           example: en
 *         original_title:
 *           type: string
 *           example: The Shawshank Redemption
 *         overview:
 *           type: string
 *           example: Imprisoned in the 1940s for the double murder of his wife and her lover upstanding banker Andy Dufresne begins a new life at the Shawshank prison where he puts his accounting skills to work for an amoral warden. During his long stretch in prison Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.
 *         popularity:
 *           type: number
 *           example: 157.956
 *         poster_path:
 *           type: string
 *           example: https://image.tmdb.org/t/p/w342/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg
 *         release_date:
 *           type: string
 *           format: date
 *           example: 1994-09-23
 *         title:
 *           type: string
 *           example: The Shawshank Redemption
 *         video:
 *           type: boolean
 *         vote_average:
 *           type: number
 *           example: 8.706
 *         vote_count:
 *           type: integer
 *           format: int32
 *           example: 26481
 *         embeded_youtube:
 *           type: string
 *           example: PLl99DlL6b4
 */

/**
 * @swagger
 * /inventory/add:
 *  post:
 *    tags: [Inventory]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      201:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *              properties:
 *                token:
 *                  type: string
 *                  exapmle: xyz...xzy
 */

// router.post("/add", async (req, res) => {
//   try {
//     logger.gebug(" POST /inventory/add request body: %j", req.body);
//     await dbContext.saveOne(Movie, { ...req.body });
//     res.status(201).json({ message: "Movie added to inventory" });
//   } catch (error) {
//     logger.error(error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/add", async (req, res) => {
  try {
    logger.gebug(" POST /inventory/add request body: %j", req.body);
    await dbContext.saveOne(Movie, { ...req.body });
    res.status(201).json({ message: "Movie added to inventory" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
