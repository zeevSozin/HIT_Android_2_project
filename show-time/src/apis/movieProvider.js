import axios from "axios";
const BASE_URL = "http://localhost:5000";

const axiosMovieProvider = axios.create({
  baseURL: BASE_URL,
});

export async function getMoviesOnCinema() {
  try {
    const response = await axiosMovieProvider.get(
      "/moviesprovider/nowInCinemas"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getMoviesTopRatedMovies() {
  try {
    const response = await axiosMovieProvider.get("/moviesprovider/toprated");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getMoviesByGenre(id) {
  try {
    const response = await axiosMovieProvider.get(
      `/moviesprovider/searchByGenreId/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getMoviesByName(name) {
  try {
    const response = await axiosMovieProvider.get(
      `/moviesprovider/searchByName/${name}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getMoviesByRating(max) {
  try {
    const min = 0;
    const response = await axiosMovieProvider.get(
      `/moviesprovider/searchByRating/${min}/${max}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
