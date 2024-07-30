import { useContext } from "react";
import styles from "./HomeSideBarContent.module.css";
import { MovieInCartContext } from "../../App";

function HomeSideBarContent() {
  const { movisInCart } = useContext(MovieInCartContext);
  return (
    <div className={styles.container}>
      <div className={styles.catHeader}>🛒 Your Cart </div>
      <div className={styles.movieList}>
        list of movies in Cart
        <ul>
          {movisInCart?.map((movie) => (
            <li>{movie.title}</li>
          ))}
          {/* <li>movie 1</li>
          <li>movie 2</li>
          <li>movie 3</li> */}
        </ul>
        <button>Check out</button>
      </div>
    </div>
  );
}

export default HomeSideBarContent;
