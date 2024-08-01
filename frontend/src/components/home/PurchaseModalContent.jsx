import { useContext } from "react";
import PurchaseItem from "./PurchaseItem";
import styles from "./PurchaseModalContent.module.css";
import {
  InventoryMovieContext,
  MovieInCartContext,
  PurchaseModalContext,
  ShownMovieContext,
  UserContext,
} from "../../App";
import { toast } from "react-toastify";
import { submitPurchse } from "../../apis/cart";
import { useNavigate } from "react-router-dom";
function PurchaseModalContent({ data }) {
  const { isPurchaseModalOpen, setIsPurchaseModalOpen } =
    useContext(PurchaseModalContext);

  const { logedInUser } = useContext(UserContext);
  const { moviesInCart, setMoviesInCart } = useContext(MovieInCartContext);
  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );
  const { movies, setMovies } = useContext(ShownMovieContext);
  const navigateHome = useNavigate();

  function handleCancel(e) {
    setIsPurchaseModalOpen(false);
  }

  function handleConfirm(e) {
    //TODO: toas with promiss do purchase
    toast.promise(submitPurchse(logedInUser.userId), {
      pending: "Confirming purchase",
      success: {
        render() {
          //TODO: reset movies isInCart
          setMoviesInCart([]);
          setInventoryMovies((movies) =>
            movies.map((mov) => {
              if (mov.isInCart) {
                mov.isInCart = false;
              }
              return mov;
            })
          );

          setMovies((movies) =>
            movies.map((mov) => {
              if (mov.isInCart) {
                mov.isInCart = false;
              }
              return mov;
            })
          );

          // navigateHome("/login");
          // navigateHome("/");

          setIsPurchaseModalOpen(false);

          return "Purchase Completed";
        },
      },
    });
  }

  return (
    <div className={styles.container}>
      <h3>Your Purchase</h3>
      <div>
        {data.map((item) => (
          <PurchaseItem data={item} />
        ))}
      </div>
      <h4>Subtotal: ${data.reduce((acc, cur) => acc + cur.retailPrice, 0)}</h4>
      <div className={styles.buttonContainer}>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default PurchaseModalContent;
