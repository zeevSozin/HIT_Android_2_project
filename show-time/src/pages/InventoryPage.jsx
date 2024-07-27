import ListContainer from "../components/ListContainer";
import useAxios from "./../hooks/useAxios";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getMoviesOnCinema } from "../apis/movieProvider";
import styles from "./InventoryPage.module.css";
import SideBar from "../components/SideBar";
import { useContext, useState } from "react";
import RetractableContainer from "../components/RetractableContainer";
import SearchBar from "../components/SearchBar";
import InventorySideBarContent from "../components/inventory/InventorySideBarContent";
import { InventoryMovieContext } from "../App";
import { mocData } from "./../util/mocData.js";
import { getItems } from "../apis/Inventory.js";

function InventoryPage() {
  // const { isLoading, data, error } = useQuery({
  //   queryKey: ["movieNowOnCinemas"],
  //   queryFn: async () => {
  //     const movies = await getMoviesOnCinema();
  //     setInventoryMovies(movies);
  //     return movies;
  //   },
  // });

  const {
    isLoading: inventoryDataLoading,
    data: inventoryData,
    error: incentoryError,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const movies = await getItems();
      setInventoryMovies(movies);
      return movies;
    },
  });

  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );

  return (
    <div className={styles.page}>
      {/* {console.log(typeof inventoryMovies, inventoryMovies)} */}
      <RetractableContainer
        sidebarContent={<InventorySideBarContent />}
        mainContent={<ListContainer data={inventoryMovies} />}
      />
    </div>
  );
}

export default InventoryPage;
