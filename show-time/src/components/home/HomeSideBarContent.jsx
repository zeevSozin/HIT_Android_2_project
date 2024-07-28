import { useContext } from "react";
import styles from "./HomeSideBarContent.module.css";
import { MovieInCartContext } from "../../App";

function HomeSideBarContent() {
  const { movisInCart } = useContext(MovieInCartContext);
  return (
    <div>
      <div>cart 🛒</div>
      <div className={styles.movieList}>
        list of movies in Carr
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
