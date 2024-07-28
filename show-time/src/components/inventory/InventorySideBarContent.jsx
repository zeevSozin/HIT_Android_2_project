import { useContext, useState } from "react";
import ColapsableItem from "../ColapsableItem";
import styles from "./InventorySideBarContent.module.css";
import SearchBar from "../SearchBar";
import {
  CardModeContext,
  InventoryMovieContext,
  SearchMovieContext,
  ShownMovieContext,
} from "../../App";
import { getMoviesOnCinema } from "./../../apis/movieProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getItems } from "./../../apis/Inventory";

function InventorySideBarContent() {
  const { movies, setMovies } = useContext(ShownMovieContext);
  const { cardMode, setCardMode } = useContext(CardModeContext);
  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );
  const { searchMoviesResults, setSearchMoviesResults } =
    useContext(SearchMovieContext);
  const [isStockSelected, setIsStockSelected] = useState(true);
  const [isOrderSelected, setIsOrderSelected] = useState(false);

  const { isLoading, data, error } = useQuery({
    queryKey: ["searchMovies"],
    queryFn: async () => {
      const data = await getMoviesOnCinema();
      setMovies(data);
      setSearchMoviesResults(data);
      return data;
    },
  });

  const inventoryMutation = useMutation({
    queryKey: ["inventory"],
    mutationFn: async () => {
      const data = await getItems();
      setMovies(data);
      return data;
    },
  });

  function handlOrderSelected(e) {
    setIsOrderSelected((cur) => !cur);
    setIsStockSelected(false);
    setCardMode((cur) => (cur = "order"));
    console.log(searchMoviesResults);
    setMovies(searchMoviesResults);
    // setIsStockSelected(isOrderSelected);
  }

  function handleStockSelected(e) {
    setIsStockSelected((cur) => !cur);
    setIsOrderSelected(false);
    setCardMode((cur) => (cur = "edit"));
    inventoryMutation.mutate();
    // setIsOrderSelected(isStockSelected);
  }
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li onClick={handlOrderSelected}>Order supply</li>
        <ColapsableItem setVisible={isOrderSelected}>
          <SearchBar />
        </ColapsableItem>
        <li onClick={handleStockSelected}>On stock</li>
        <ColapsableItem setVisible={isStockSelected}>
          <p>books</p>
          <p>folders</p>
          <p>tests</p>
          <p>ducks</p>
        </ColapsableItem>
      </ul>
    </div>
  );
}

export default InventorySideBarContent;
