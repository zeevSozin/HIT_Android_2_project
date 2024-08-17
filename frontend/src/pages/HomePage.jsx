import { useContext, useEffect, useState } from "react";
import HomeSideBarContent from "../components/home/HomeSideBarContent";
import ListContainer from "../components/ListContainer";
import RetractableContainer from "../components/RetractableContainer";
import styles from "./HomePage.module.css";
import {
  CardModeContext,
  InventoryMovieContext,
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

  useEffect(() => {
    setCardMode("sell");
    console.log("inventory movies:", inventoryMovies);
    setMovies((movies) => (movies = [...inventoryMovies]));
    console.log("Home Page rerenders");

    // moviesInCart.length &&
    //   setMovies(
    //     (cur) =>
    //       (cur = inventoryMovies.map((mov) => {
    //         moviesInCart.filter((m) => m.id === mov.id)[0]
    //           ? (mov.isInCart = true)
    //           : (mov.isInCart = false);
    //         console.log("mov is ", mov);
    //         return mov;
    //       }))
    //   );
    // console.log("movies after use effect", movies);
  }, [inventoryMovies]);

  const {
    isLoading: inventoryDataLoading,
    data: inventoryData,
    error: incentoryError,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const movies = await getItems();
      setInventoryMovies(movies);
      setMovies(movies);
      return movies;
    },
  });
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
