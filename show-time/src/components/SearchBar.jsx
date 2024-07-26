import { useState } from "react";
import styles from "./SearchBar.module.css";

const generes = [
  { key: 28, value: "Action" },
  { key: 12, value: "Adventure" },
  { key: 16, value: "Animation" },
  { key: 35, value: "Comedy" },
  { key: 80, value: "Crime" },
  { key: 99, value: "Documentary" },
  { key: 18, value: "Drama" },
  { key: 10751, value: "Family" },
  { key: 14, value: "Fantasy" },
  { key: 36, value: "History" },
  { key: 27, value: "Horror" },
  { key: 10402, value: "Music" },
  { key: 9648, value: "Mystery" },
  { key: 10749, value: "Romance" },
  { key: 878, value: "Science Fiction" },
  { key: 10770, value: "TV Movie" },
  { key: 53, value: "Thriller" },
  { key: 10752, value: "War" },
  { key: 37, value: "Western" },
];

function SearchBar() {
  const [selectedGenre, setSelectedGenere] = useState("None");
  const [searchName, setSearchName] = useState("");
  const [raiting, setrating] = useState(0);

  function handleSearchByGenere(e) {
    alert(`slected genre: ${e.target.value}`);
  }

  function handleSearchByName(e) {}

  function handleRatingChange(e) {
    setrating((cur) => (cur = e.target.value));
  }
  return (
    <div>
      <div className={styles.buttonCluster}>
        <button>Now on cinemas</button>
        <button>Top Rated</button>
      </div>
      <div className={styles.filter}>
        <label>Gaenare</label>
        <select value={selectedGenre} onChange={handleSearchByGenere}>
          {generes.map((genere) => (
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
        <label style={{ marginRight: 5 }}>Rating</label>
        <input
          type="range"
          name="rate"
          min="0"
          max="10"
          //   value={raiting}
          onChange={handleRatingChange}
        />
        {raiting}
      </div>
    </div>
  );
}

export default SearchBar;
