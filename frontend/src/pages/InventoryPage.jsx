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
import { SearchMovieContext, ShownMovieContext } from "../App";
import { mocData } from "./../util/mocData.js";
import { getItems } from "../apis/Inventory.js";

function InventoryPage() {
  const { searchMoviesResult, setSearchMoviesResult } =
    useContext(SearchMovieContext);

  const { movies, setMovies } = useContext(ShownMovieContext);

  return (
    <div className={styles.page}>
      <RetractableContainer
        sidebarContent={<InventorySideBarContent />}
        mainContent={<ListContainer data={movies} />}
      />
    </div>
  );
}

export default InventoryPage;
