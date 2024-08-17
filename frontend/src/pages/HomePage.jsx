import { useContext, useEffect, useRef, useState } from "react";
import HomeSideBarContent from "../components/home/HomeSideBarContent";
import ListContainer from "../components/ListContainer";
import RetractableContainer from "../components/RetractableContainer";
import styles from "./HomePage.module.css";
import {
  CardModeContext,
  InventoryMovieContext,
  InventoryRefetchContext,
  InventoryRefetchContxt,
  LoadingContext,
  MovieInCartContext,
  PurchaseModalContext,
  ShownMovieContext,
} from "../App";
import {
  defaultShouldDehydrateMutation,
  useQuery,
} from "@tanstack/react-query";
import { getItems } from "../apis/Inventory";
import MovieModalContent from "../components/MovieModalContent";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import PurchaseModalContent from "../components/home/PurchaseModalContent";

function HomePage() {
  const { movies, setMovies } = useContext(ShownMovieContext);
  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );

  const { moviesInCart, setMoviesInCart } = useContext(MovieInCartContext);
  const { cardMode, setCardMode } = useContext(CardModeContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const { isPurchaseModalOpen, setIsPurchaseModalOpen } =
    useContext(PurchaseModalContext);
  const { inventoryRefetch } = useContext(InventoryRefetchContxt);

  const {
    isLoading: inventoryDataLoading,
    data: inventoryData,
    error: incentoryError,
    refetch,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const movies = await getItems();
      setInventoryMovies(movies);
      setMovies(movies);
      return movies;
    },
  });

  useEffect(() => {
    setCardMode("sell");
    console.log("inventory movies:", inventoryMovies);
    setMovies((movies) => (movies = [...inventoryMovies]));
    console.log("Home Page rerenders");
  }, [inventoryMovies]);

  inventoryRefetch.fn = refetch;

  return (
    <div>
      {console.log("shown movies:", movies)}
      {setIsLoading(inventoryDataLoading)}
      <RetractableContainer
        sidebarContent={<HomeSideBarContent />}
        iconType={"cart"}
        mainContent={<ListContainer data={movies} />}
      />
      <Modal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
      >
        <PurchaseModalContent data={moviesInCart} />
      </Modal>
    </div>
  );
}

export default HomePage;
