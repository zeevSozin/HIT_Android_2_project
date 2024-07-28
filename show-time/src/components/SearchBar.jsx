import { useContext, useState } from "react";
import styles from "./SearchBar.module.css";
import ItemListConatiner from "./ItemListConatiner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { genresDict } from "./../data/genresDict.js";
import {
  InventoryMovieContext,
  SearchMovieContext,
  ShownMovieContext,
} from "./../App";
import {
  getMoviesTopRatedMovies,
  getMoviesOnCinema,
  getMoviesByGenre,
  getMoviesByName,
  getMoviesByRating,
} from "./../apis/movieProvider";

function SearchBar() {
  const [selectedGenre, setSelectedGenere] = useState("None");
  const [selectedGenreId, setSelectedGenereId] = useState(28);
  const [searchName, setSearchName] = useState("");
  const [raiting, setrating] = useState(0);
  const [isNowOnCinemasEnabled, setIsNowOnCinemaEnabled] = useState(true);
  const { movies, setMovies } = useContext(ShownMovieContext);
  const { searchMovies, setSearchMoviesResult } =
    useContext(SearchMovieContext);

  // queries
  const {
    isLoading: isLoadingMoviesNowOnCinema,
    isError: isErrorMoviesNowOnCinema,
    data: moviesNowOnCinema,
    error: ErrorMoviesNowOnCinema,
  } = useQuery({
    queryKey: ["searchNowOnCinema"],
    queryFn: getMoviesOnCinema,
  });

  const {
    isLoading: isLoadingMoviesTopRated,
    isError: isErrorMoviesTopRated,
    data: moviesTopRated,
    error: ErrorMoviesTopRated,
  } = useQuery({
    queryKey: ["searchTopRated"],
    queryFn: getMoviesTopRatedMovies,
  });

  const mutatesearchByGenre = useMutation({
    queryKey: ["searchMovies"],
    mutationFn: async (id) => {
      const data = await getMoviesByGenre(id);
      setMovies((cur) => (cur = data));
    },
  });

  const mutateByName = useMutation({
    queryKey: ["searchMovies"],
    mutationFn: async (name) => {
      const data = await getMoviesByName(name);
      setMovies((cur) => (cur = data));
    },
  });

  const mutateByRatong = useMutation({
    queryKey: ["searchMovies"],
    mutationFn: async (maxRate) => {
      const data = await getMoviesByRating(maxRate);
      setMovies((cur) => (cur = data));
    },
  });

  // event handlers

  async function handleSearchNowOnCinema(e) {
    setMovies((cur) => (cur = moviesNowOnCinema));
  }
  function handleSearchTopRated(e) {
    setMovies((cur) => (cur = moviesTopRated));
  }

  function handleSearchByGenere(e) {
    const val = e.target.value;
    setSelectedGenere((cur) => (cur = val));
    const genreId = genresDict.filter((entry) => entry.value === val)[0].key;
    setSelectedGenereId((cur) => (cur = genreId));

    mutatesearchByGenre.mutate(selectedGenreId);
  }

  function handleSearchByName(e) {
    const val = e.target.value;
    setSearchName((cur) => (cur = val));
    val ? mutateByName.mutate(val) : handleSearchNowOnCinema();
  }

  function handleRatingChange(e) {
    const val = e.target.value;
    setrating((cur) => (cur = val));
    mutateByRatong.mutate(val);
  }
  return (
    <div className={styles.container}>
      <div className={styles.buttonCluster}>
        <button onClick={handleSearchNowOnCinema}>Now on cinemas</button>
        <button onClick={handleSearchTopRated}>Top Rated</button>
      </div>
      <div className={styles.filter}>
        <label>Gaenare</label>
        <select value={selectedGenre} onChange={handleSearchByGenere}>
          {genresDict.map((genere) => (
            <option key={genere.key} value={genere.value}>
              {genere.value}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filter}>
        <label style={{ marginRight: 5 }}>Name</label>
        <input type="text" value={searchName} onChange={handleSearchByName} />
      </div>
      <div className={styles.filter}>
        <label style={{ marginRight: 5 }}>Min. Rating</label>
        <input
          type="range"
          name="rate"
          min="0"
          max="10"
          value={raiting}
          onChange={handleRatingChange}
        />
        {raiting}
      </div>
      {/* <button onClick={() => setSearchMovieResults([])}>Clear</button> */}
    </div>
  );
}

export default SearchBar;
