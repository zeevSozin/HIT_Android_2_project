import { useContext, useEffect } from "react";
import HomeSideBarContent from "../components/home/HomeSideBarContent";
import ListContainer from "../components/ListContainer";
import RetractableContainer from "../components/RetractableContainer";
import styles from "./HomePage.module.css";
import { CardModeContext, ShownMovieContext } from "../App";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../apis/Inventory";
import MovieModalContent from "../components/MovieModalContent";

function HomePage() {
  const { movies, setMovies } = useContext(ShownMovieContext);
  const { cardMode, setCardMode } = useContext(CardModeContext);
  useEffect(() => {
    setCardMode("sell");
  }, []);

  const {
    isLoading: inventoryDataLoading,
    data: inventoryData,
    error: incentoryError,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const movies = await getItems();
      setMovies(movies);
      return movies;
    },
  });
  return (
    <div>
      <RetractableContainer
        sidebarContent={<HomeSideBarContent />}
        mainContent={<ListContainer data={movies} />}
      />
    </div>
  );
}

export default HomePage;
