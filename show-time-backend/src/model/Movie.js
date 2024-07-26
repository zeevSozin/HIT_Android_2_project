const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const movieSchema = new Schema({
  adult: Boolean,
  backdrop_path: String,
  genre_ids: [String],
  id: {
    type: Number,
    unique: true,
  },
  original_language: String,
  original_title: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: Date,
  title: String,
  video: Boolean,
  vote_average: Number,
  vote_count: Number,
  embeded_youtube: String,
  avalibleAmount: Number,
  soldAmount: Number,
  price: Number,
  retailPrice: Number,
});

const Movie = model("movie", movieSchema);

module.exports = Movie;
