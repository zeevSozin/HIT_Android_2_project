import styles from "./InventoryStockSearchBar.module.css";
import { useContext, useState } from "react";
import SortControl from "../SortControl";
import {
  orderByAvalibleAmount,
  orderByName,
  orderByPrice,
  orderByRating,
  orderByRetailPrice,
  orderBySoldAmount,
} from "../../util/InventoryFilter";
import { InventoryMovieContext, ShownMovieContext } from "../../App";

function InventoryStockSearchBar() {
  const [sortdActiveArr, setSortActiveArr] = useState("000000");
  const { movies, setMovies } = useContext(ShownMovieContext);
  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );
  const [ratingFilter, setRatingFilter] = useState(10);
  const [nameFilter, setNameFilter] = useState("");

  function handleRatingFilter(e) {
    const val = e.target.value;
    setRatingFilter((cur) => (cur = val));
    setMovies(
      (cur) => (cur = inventoryMovies.filter((mov) => mov.vote_average < val))
    );
  }

  function handleNameFilter(e) {
    const val = e.target.value;
    setNameFilter((cur) => (cur = val));
    setMovies(
      (cur) =>
        (cur = val
          ? inventoryMovies.filter((mov) =>
              mov.original_title.toLowerCase().includes(val.toLowerCase())
            )
          : inventoryMovies)
    );
  }

  function handleSortAscName() {
    setSortActiveArr((cur) => (cur = "100000"));
    setMovies((cur) => [...orderByName(movies, true)]);
  }
  function handleSortDescName() {
    setSortActiveArr((cur) => (cur = "100000"));
    setMovies((cur) => [...orderByName(movies, false)]);
  }
  function handleSortAscRating() {
    setSortActiveArr((cur) => (cur = "010000"));
    setMovies((cur) => [...orderByRating(movies, true)]);
  }
  function handleSortDescRating() {
    setSortActiveArr((cur) => (cur = "010000"));
    setMovies((cur) => [...orderByRating(movies, false)]);
  }
  function handleSortAscPrice() {
    setSortActiveArr((cur) => (cur = "001000"));
    setMovies((cur) => [...orderByPrice(movies, true)]);
  }
  function handleSortDescPrice() {
    setSortActiveArr((cur) => (cur = "001000"));
    setMovies((cur) => [...orderByPrice(movies, false)]);
  }
  function handleSortAscRetailPrice() {
    setSortActiveArr((cur) => (cur = "000100"));
    setMovies((cur) => [...orderByRetailPrice(movies, true)]);
  }
  function handleSortDescRetailPrice() {
    setSortActiveArr((cur) => (cur = "000100"));
    setMovies((cur) => [...orderByRetailPrice(movies, false)]);
  }
  function handleSortAscAvalible() {
    setSortActiveArr((cur) => (cur = "000010"));
    setMovies((cur) => [...orderByAvalibleAmount(movies, true)]);
  }
  function handleSortDescAvalible() {
    setSortActiveArr((cur) => (cur = "000010"));
    setMovies((cur) => [...orderByAvalibleAmount(movies, false)]);
  }
  function handleSortAscSold() {
    setSortActiveArr((cur) => (cur = "000001"));
    setMovies((cur) => [...orderBySoldAmount(movies, true)]);
  }
  function handleSortDescSold() {
    setSortActiveArr((cur) => (cur = "000001"));
    setMovies((cur) => [...orderBySoldAmount(movies, false)]);
  }
  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <h4>Filters</h4>
        <div className={styles.row}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={nameFilter}
            onChange={handleNameFilter}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="range"
            id="rating"
            min="0"
            max="10"
            value={ratingFilter}
            onChange={handleRatingFilter}
          />
          {ratingFilter}
        </div>
        {/* <div className={styles.row}>
          <label htmlFor="amount">Avalible:</label>
          <input
            type="range"
            id="amount"
            min="0"
            max="10"
            value={ratingFilter}
            onChange={handleRatingFilter}
          />
        </div> */}
      </div>
      <div className={styles.sorters}>
        <h4>Sorting</h4>
        <SortControl
          title={"Name"}
          type={"txt"}
          active={Number(sortdActiveArr[0])}
          onSortAsc={handleSortAscName}
          onSortDesc={handleSortDescName}
        />
        <SortControl
          title={"Rating"}
          type={"num"}
          active={Number(sortdActiveArr[1])}
          onSortAsc={handleSortAscRating}
          onSortDesc={handleSortDescRating}
        />
        <SortControl
          title={"Price"}
          type={"num"}
          active={Number(sortdActiveArr[2])}
          onSortAsc={handleSortAscPrice}
          onSortDesc={handleSortDescPrice}
        />
        <SortControl
          title={"Retail price"}
          type={"num"}
          active={Number(sortdActiveArr[3])}
          onSortAsc={handleSortAscRetailPrice}
          onSortDesc={handleSortDescRetailPrice}
        />
        <SortControl
          title={"Avalible"}
          type={"num"}
          active={Number(sortdActiveArr[4])}
          onSortAsc={handleSortAscAvalible}
          onSortDesc={handleSortDescAvalible}
        />
        <SortControl
          title={"Sold"}
          type={"num"}
          active={Number(sortdActiveArr[5])}
          onSortAsc={handleSortAscSold}
          onSortDesc={handleSortDescSold}
        />
      </div>
    </div>
  );
}

export default InventoryStockSearchBar;
