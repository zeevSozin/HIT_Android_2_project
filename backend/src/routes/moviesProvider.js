const express = require("express");
const logger = require("./../util/logger");
const TmdbAPI = require("./../api/tmdbApi");

const router = express.Router();

const tmadbApi = new TmdbAPI();

/**
 * @swagger
 * components:
 *  schemas:
 *    ProvidedMovie:
 *      type: object
 *      properties:
 *        adult:
 *          type: boolean
 *        backdrop_path:
 *          type: string
 *          example: /zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg
 *        genre_ids:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *          example: []
 *        id:
 *          type: integer
 *          format: int32
 *          example: 278
 *        original_language:
 *          type: string
 *          example: en
 *        original_title:
 *          type: string
 *          example: The Shawshank Redemption
 *        overview:
 *          type: string
 *          example: Imprisoned in the 1940s for the double murder of ....
 *        popularity:
 *          type: number
 *          example: 129.706
 *        poster_path:
 *          type: string
 *          example: /9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg
 *        release_date:
 *          type: string
 *          format: date
 *          example: 1994-09-23
 *        title:
 *          type: string
 *          example: The Shawshank Redemption
 *        video:
 *          type: boolean
 *        vote_average:
 *          type: number
 *          example: 8.706
 *        vote_count:
 *          type: integer
 *          format: int32
 *          example: 26472
 *    genres:
 *      type: object
 *      properties:
 *        12:
 *          type: string
 *          example: Adventure
 *        14:
 *          type: string
 *          example: Fantasy
 *        16:
 *          type: string
 *          example: Animation
 *        18:
 *          type: string
 *          example: Drama
 *        27:
 *          type: string
 *          example: Horror
 *        28:
 *          type: string
 *          example: Action
 *        35:
 *          type: string
 *          example: Comedy
 *        36:
 *          type: string
 *          example: History
 *        37:
 *          type: string
 *          example: Western
 *        53:
 *          type: string
 *          example: Thriller
 *        80:
 *          type: string
 *          example: Crime
 *        99:
 *          type: string
 *          example: Documentary
 *        878:
 *          type: string
 *          example: Science Fiction
 *        9648:
 *          type: string
 *          example: Mystery
 *        10402:
 *          type: string
 *          example: Music
 *        10749:
 *          type: string
 *          example: Romance
 *        10751:
 *          type: string
 *          example: Family
 *        10752:
 *          type: string
 *          example: War
 *        10770:
 *          type: string
 *          example: TV Movie
 *
 */

/**
 * @swagger
 * /moviesprovider/nowInCinemas:
 *  get:
 *    tags: [Movie provider]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/ProvidedMovie'
 */

router.get("/nowInCinemas", async (req, res) => {
  try {
    const result = await tmadbApi.nowPlaying();
    res.status(200).json(result);
  } catch (error) {
    logger.error(error.request ? error.data : error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /moviesprovider/toprated:
 *  get:
 *    tags: [Movie provider]
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/ProvidedMovie'
 */

router.get("/toprated", async (req, res) => {
  try {
    const result = await tmadbApi.topRated();
    res.status(200).json(result);
  } catch (error) {
    logger.error(error.request ? error.data : error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 *   /moviesprovider/poster/{id}:
 *     get:
 *       tags: [Movie provider]
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: The movie id
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                 properties:
 *                   imagePath:
 *                     type: string
 *                     example: https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg
 *
 */

router.get("/poster/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await tmadbApi.getPosterById(req.params.id);
    res.status(200).json({ imagePath: result });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 *   /moviesprovider/trailer/{id}:
 *     get:
 *       tags: [Movie provider]
 *       description: This endpoint provides an embeded video id for yuoutube
 *       parameters:
 *         - in: path
 *           name: id
 *           type: string
 *           required: true
 *           description: The movie id
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                 properties:
 *                   embededId:
 *                     type: string
 *                     example: MCsG9zH7DJE
 *
 */

router.get("/trailer/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await tmadbApi.getTrailerById(req.params.id);
    res.status(200).json({ embededId: result });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 *   /moviesprovider/searchByName/{name}:
 *     get:
 *       tags: [Movie provider]
 *       description: This endpoint alows to search movies by name
 *       parameters:
 *         - in: path
 *           name: name
 *           type: string
 *           required: true
 *           description: Movie name
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                 properties:
 *                   embededId:
 *                     type: string
 *                     example: MCsG9zH7DJE
 *
 */

router.get("/searchByName/:name", async (req, res) => {
  try {
    console.log(req.params.name);
    const result = await tmadbApi.getMoviesByName(req.params.name);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 *   /moviesprovider/searchByGenreId/{id}:
 *     get:
 *       tags: [Movie provider]
 *       description: This endpoint alows to search movies by name
 *       parameters:
 *         - in: path
 *           name: id
 *           type: int32
 *           required: true
 *           description: Genre id
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                 properties:
 *                   embededId:
 *                     type: string
 *                     example: MCsG9zH7DJE
 *
 */

router.get("/searchByGenreId/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await tmadbApi.getMoviesByGenre(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 *   /moviesprovider/searchByRating/{min}/{max}:
 *     get:
 *       tags: [Movie provider]
 *       description: This endpoint alows to search movies by name
 *       parameters:
 *         - in: path
 *           name: min
 *           type: int32
 *           required: true
 *           description: Minimal rating (0)
 *         - in: path
 *           name: max
 *           type: int32
 *           required: true
 *           description: Maximal rating (10)
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 items:
 *                 properties:
 *                   embededId:
 *                     type: string
 *                     example: MCsG9zH7DJE
 *
 */

router.get("/searchByRating/:min/:max", async (req, res) => {
  try {
    const min = req.params.min;
    const max = req.params.max;
    console.log(min, max);
    const result = await tmadbApi.getMoviesByRating(min, max);
    res.status(200).json(result);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
