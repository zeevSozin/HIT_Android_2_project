import axios from "axios";
const BASE_URL = "http://localhost:5000";

export async function getMoviesOnCinema() {
  try {
    const response = await axios.get(BASE_URL + "/moviesprovider/nowInCinemas");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
