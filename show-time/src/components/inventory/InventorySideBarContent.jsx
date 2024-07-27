import { useContext, useState } from "react";
import ColapsableItem from "../ColapsableItem";
import styles from "./InventorySideBarContent.module.css";
import SearchBar from "../SearchBar";
import { InventoryMovieContext } from "../../App";
import { getMoviesOnCinema } from "./../../apis/movieProvider";
import { useQuery } from "@tanstack/react-query";

function InventorySideBarContent() {
  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );
  const [isStockSelected, setIsStockSelected] = useState(true);
  const [isOrderSelected, setIsOrderSelected] = useState(false);

  const { isLoading, data, error } = useQuery({
    queryKey: ["searchMovies"],
    queryFn: async () => {
      const data = await getMoviesOnCinema();
      setInventoryMovies(data);
      return data;
    },
  });

  function handleStockSelected(e) {
    setIsStockSelected((cur) => !cur);
    // setIsOrderSelected(isStockSelected);
  }

  function handlOrderSelected(e) {
    setIsOrderSelected((cur) => !cur);
    // setIsStockSelected(isOrderSelected);
  }
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li onClick={handleStockSelected}>On stock</li>
        <ColapsableItem setVisible={isStockSelected}>
          <p>books</p>
          <p>folders</p>
          <p>tests</p>
          <p>ducks</p>
        </ColapsableItem>

        <li onClick={handlOrderSelected}>Order supply</li>
        <ColapsableItem setVisible={isOrderSelected}>
          <SearchBar />
        </ColapsableItem>
      </ul>
    </div>
  );
}

export default InventorySideBarContent;
