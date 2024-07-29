import { useContext, useEffect } from "react";
import HomeSideBarContent from "../components/home/HomeSideBarContent";
import ListContainer from "../components/ListContainer";
import RetractableContainer from "../components/RetractableContainer";
import styles from "./HomePage.module.css";
import { CardModeContext, LoadingContext, ShownMovieContext } from "../App";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../apis/Inventory";
import MovieModalContent from "../components/MovieModalContent";
import LoadingSpinner from "../components/LoadingSpinner";

function HomePage() {
  const { movies, setMovies } = useContext(ShownMovieContext);
  const { cardMode, setCardMode } = useContext(CardModeContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
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
      {setIsLoading(inventoryDataLoading)}
      <RetractableContainer
        sidebarContent={<HomeSideBarContent />}
        mainContent={<ListContainer data={movies} />}
      />
    </div>
  );
}

export default HomePage;
