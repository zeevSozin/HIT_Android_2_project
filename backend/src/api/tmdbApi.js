const axios = require("axios");
const config = require("config");
const logger = require("./../util/logger");
const encode = require("./../util/urlStringTransformer");
const { addPosterUrl, transformGenreIdToStr } = require("./tmbdUtil");

const API_KEY = config.get("tmdb.apikey");
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w342";
// const YOUTUBE_URL = "https://www.youtube.com/watch?v=";

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${API_KEY}` },
});

class TmdbAPI {
  constructor() {}

  async nowPlaying() {
    const uri = "/movie/now_playing?language=en-US&page=1";
    try {
      const response = await axiosInstance({
        baseURL: API_URL,
        method: "get",
        url: uri,
      });

      logger.debug("TMDB response: %j", response.data);

      const rawData = response.data;

      const cleanData = await Promise.all(
        rawData.results.map(async (mov) => {
          const res = addPosterUrl(
            transformGenreIdToStr(mov),
            IMAGE_URL,
            mov.poster_path
          );
          const embeddedtrailer = await this.getTrailerById(mov.id);
          res.embeded_youtube = embeddedtrailer;
          return res;
        })
      );

      return cleanData;
    } catch (error) {
      logger.error(error.request ? error.data : error.message);
      throw error;
    }
  }

  async topRated() {
    const uri = "/movie/top_rated?language=en-US&page=1";
    try {
      const response = await axiosInstance({
        baseURL: API_URL,
        method: "get",
        url: uri,
      });
      logger.debug("TMDB response: %j", response.data);

      const rawData = response.data;

      const cleanData = await Promise.all(
        rawData.results.map(async (mov) => {
          const res = addPosterUrl(
            transformGenreIdToStr(mov),
            IMAGE_URL,
            mov.poster_path
          );
          const embeddedtrailer = await this.getTrailerById(mov.id);
          res.embeded_youtube = embeddedtrailer;
          return res;
        })
      );

      return cleanData;
    } catch (error) {
      logger.error(error.request ? error.data : error.message);
      throw error;
    }
  }

  async getPosterById(movieId) {
    try {
      // console.log(movieId);
      const uri = `/movie/${movieId}?language=en-US`;
      logger.debug("TMDB API, about to getPoserBy ID with the URL: %s", uri);
      const response = await axiosInstance({
        baseURL: API_URL,
        method: "get",
        url: uri,
      });
      // console.log(response);
      const posterPath = response.data.poster_path
        ? response.data.poster_path
        : "";
      logger.debug(
        "TMDB get Poster By Id: %s",
        `${IMAGE_URL}/w500${posterPath}`
      );
      return `${IMAGE_URL}/w500${posterPath}`;
    } catch (error) {
      logger.error(error.request ? error.data : error.message);
      throw error;
    }
  }

  async getTrailerById(movieId) {
    try {
      const uri = `/movie/${movieId}/videos?language=en-US'`;
      logger.debug(
        "TMDB API, about to get Trailer By ID with the URL: %s",
        uri
      );

      const response = await axiosInstance({
        baseURL: API_URL,
        method: "get",
        url: uri,
      });

      const videoResults = response.data.results;
      const TrailerMovieObj = videoResults
        .filter(
          (mov) =>
            mov.site === "YouTube" &&
            mov.official === true &&
            mov.type === "Trailer"
        )
        .map((mov) => {
          // console.log(mov);
          return mov.key;
        })[0];
      logger.debug(
        "TMDB getTrailerById filterd the first embeded movieId: %j",
        TrailerMovieObj
      );

      return TrailerMovieObj;
    } catch (error) {
      logger.error(error.request ? error.data : error.message);
      throw error;
    }
  }

  async getMoviesByName(movieName) {
    try {
      const encodedName = encode(movieName);
      const uri = `/search/movie?query=${encodedName}&include_adult=false&language=en-US&page=1`;
      logger.debug(
        "TMDB API, about to get Movies By Name with the URL: %s",
        uri
      );
      const response = await axiosInstance({
        baseURL: API_URL,
        method: "get",
        url: uri,
      });

      logger.debug("TMDB getMoviesByName search result: %j", response.data);
      const rawData = response.data;

      const cleanData = await Promise.all(
        rawData.results.map(async (mov) => {
          const res = addPosterUrl(
            transformGenreIdToStr(mov),
            IMAGE_URL,
            mov.poster_path
          );
          const embeddedtrailer = await this.getTrailerById(mov.id);
          res.embeded_youtube = embeddedtrailer;
          return res;
        })
      );

      return cleanData;
    } catch (error) {
      logger.error(error.request ? error.data : error.message);
      throw error;
    }
  }

  async getMoviesByRating(minRating = 0, maxRating = 11) {
    try {
      const uri = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=${minRating}&vote_average.lte=${maxRating}`;
      logger.debug(
        "TMDB API, about to get Movies By Rating with the URL: %s",
        uri
      );
      const response = await axiosInstance({
        baseURL: API_URL,
        method: "get",
        url: uri,
      });
      logger.debug("TMDB getMoviesByRating search result: %j", response.data);
      const rawData = response.data;

      const cleanData = await Promise.all(
        rawData.results.map(async (mov) => {
          const res = addPosterUrl(
            transformGenreIdToStr(mov),
            IMAGE_URL,
            mov.poster_path
          );
          const embeddedtrailer = await this.getTrailerById(mov.id);
          res.embeded_youtube = embeddedtrailer;
          return res;
        })
      );

      return cleanData;
    } catch (error) {
      logger.error(error.request ? error.data : error.message);
      throw error;
    }
  }

  async getMoviesByGenre(genreId) {
    try {
      const uri = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
      logger.debug(
        "TMDB API, about to get Movies By Genre with the URL: %s",
        uri
      );
      const response = await axiosInstance({
        baseURL: API_URL,
        method: "get",
        url: uri,
      });

      logger.debug("TMDB getMoviesByRating search result: %j", response.data);
      const rawData = response.data;

      const cleanData = await Promise.all(
        rawData.results.map(async (mov) => {
          const res = addPosterUrl(
            transformGenreIdToStr(mov),
            IMAGE_URL,
            mov.poster_path
          );
          const embeddedtrailer = await this.getTrailerById(mov.id);
          res.embeded_youtube = embeddedtrailer;
          return res;
        })
      );

      return cleanData;
    } catch (error) {
      logger.error(error.request ? error.data : error.message);
      throw error;
    }
  }
}

module.exports = TmdbAPI;
