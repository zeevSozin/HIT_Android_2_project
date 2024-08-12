import { useContext, useState } from "react";
import styles from "./HomeSideBarContent.module.css";
import {
  MovieInCartContext,
  PurchaseModalContext,
  UserContext,
} from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart, checkout } from "../../apis/cart";
import Modal from "../Modal";
import PurchaseModalContent from "./PurchaseModalContent";

function HomeSideBarContent() {
  const { moviesInCart, setMoviesInCart } = useContext(MovieInCartContext);
  const { isPurchaseModalOpen, setIsPurchaseModalOpen } =
    useContext(PurchaseModalContext);
  const { logedInUser } = useContext(UserContext);
  const navigateLogin = useNavigate();

  function handleCheckOut(e) {
    if (!logedInUser.email) {
      navigateLogin("/login");
    } else {
      setIsPurchaseModalOpen((cur) => (cur = true));
      const payload = {
        userId: logedInUser.userId,
        itemIds: moviesInCart.map((mov) => mov._id),
      };
      toast.promise(checkout(payload), {
        pending: "Checking out...",
        success: {
          render() {
            return "Cart Checked out";
          },
        },
        error: "Failed to checkout",
      });
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.catHeader}>🛒 Your Cart </div>
      <div className={styles.movieList}>
        <ul>
          {moviesInCart?.map((movie) => (
            <li key={movie.id}>
              {movie.title}:<strong> ${movie.retailPrice}</strong>
            </li>
          ))}
        </ul>
        <div className={styles.subtotal}>
          Subtotal: $
          {moviesInCart.reduce((acc, cur) => acc + cur.retailPrice, 0)}
        </div>

        <button onClick={handleCheckOut}>Check out</button>
      </div>
    </div>
  );
}

export default HomeSideBarContent;
