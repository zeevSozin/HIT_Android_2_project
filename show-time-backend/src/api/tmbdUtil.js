const logger = require("./../util/logger");

const genreDict = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function addPosterUrl(movie, url, posterPath) {
  logger.debug("tmdbUtil addPosterUrl about to transform: %j", movie);
  movie.poster_path = `${url}${posterPath}`;
  logger.debug("tmdbUtil addPosterUrl transformd to: %j", movie);
  return movie;
}

function transformGenreIdToStr(movie) {
  logger.debug("tmdbUtil transformGenreIdToStr about to transform: %j", movie);
  const genres = movie.genre_ids.map((id) => {
    return genreDict[id] ? genreDict[id] : id;
  });
  logger.debug("tmdbUtil transformGenreIdToStr transformd: %j", movie);
  const transformedMovie = movie;
  transformedMovie.genre_ids = genres;
  return transformedMovie;
}

module.exports = {
  addPosterUrl,
  transformGenreIdToStr,
};
