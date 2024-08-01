import { useContext, useState } from "react";
import styles from "./MovieCard.module.css";
import {
  CardModeContext,
  InventoryMovieContext,
  MovieInCartContext,
  UserContext,
} from "../App";
import MovieModalContent from "./MovieModalContent";
import OrderModalContent from "./inventory/OrderModalContent";
import BuyModalContent from "./home/PurchaseModalContent";
import EditModalContent from "./inventory/EditModalContent";
import Modal from "./Modal";
import StarRating from "./StarRating";

function MovieCard({ data }) {
  const { cardMode, setCardMode } = useContext(CardModeContext);
  const { moviesInCart, setMoviesInCart } = useContext(MovieInCartContext);
  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );
  const { logedInUser } = useContext(UserContext);
  const [isDetailsOpen, setIsDetailesOpen] = useState(false);
  const [isFunctionOpen, setIsFunctionOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(data.isInCart);

  function handleShowDetaies(e) {
    setIsDetailesOpen((cur) => (cur = true));
  }

  function handleFuncButton(e) {
    setIsFunctionOpen((cur) => (cur = true));
  }

  function handleAddToCart(e) {
    setMoviesInCart((cur) => [data, ...cur]);
    data.isInCart = true;
    // setInventoryMovies((movies) => {
    //   movies.map((mov) => {
    //     if (mov.id === data.id) {
    //       mov.isInCart = true;
    //     }
    //     return mov;
    //   });
    // });

    setIsInCart((cur) => !cur);
  }
  function handleRemoveFromCart(e) {
    setMoviesInCart((cur) => cur.filter((mov) => mov.id !== data.id));
    data.isInCart = false;
    // setInventoryMovies((movies) => {
    //   movies.map((mov) => {
    //     if (mov.id === data.id) {
    //       mov.isInCart = false;
    //     }
    //     return mov;
    //   });
    // });
    setIsInCart((cur) => !cur);
  }

  return (
    <div className={styles.card}>
      <h3>{data.original_title}</h3>
      <img src={data.poster_path} alt={data.original_title} />
      <StarRating rating={data.vote_average} />
      {cardMode === "sell" && (
        <strong>Price: ${data.retailPrice ? data.retailPrice : 0}</strong>
      )}
      {cardMode === "edit" && (
        <div>
          <div>
            <strong style={{ marginRight: "1em" }}>
              Avalible: {data.avalibleAmount ? data.avalibleAmount : 0}
            </strong>

            <strong>Sold: {data.soldAmount ? data.soldAmount : 0}</strong>
          </div>
          <div>
            <strong>Order Price: ${data.price ? data.price : 0}</strong>
          </div>
          <div>
            <strong>
              Retail Price: ${data.retailPrice ? data.retailPrice : 0}
            </strong>
          </div>
        </div>
      )}
      <div className={styles.bottomButtonConatiner}>
        <button onClick={handleShowDetaies}>Detailes</button>
        <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailesOpen(false)}>
          <MovieModalContent data={data} />
        </Modal>
        {cardMode === "sell" && (
          <>
            {data.isInCart ? (
              <button
                onClick={handleRemoveFromCart}
                style={{ background: "var(--color-secondary-400)" }}
              >
                Remove from cart 🗑️
              </button>
            ) : (
              <button onClick={handleAddToCart}>Add to cart 🛒</button>
            )}
          </>
        )}

        {cardMode === "order" && (
          <>
            <button onClick={handleFuncButton}>Order now</button>
            <Modal
              isOpen={isFunctionOpen}
              onClose={() => setIsFunctionOpen(false)}
            >
              <OrderModalContent data={data} />
            </Modal>
          </>
        )}

        {cardMode === "edit" && (
          <>
            <button onClick={handleFuncButton}>Edit</button>
            <Modal
              isOpen={isFunctionOpen}
              onClose={() => setIsFunctionOpen(false)}
            >
              <EditModalContent
                data={data}
                onClose={() => setIsFunctionOpen(false)}
              />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
