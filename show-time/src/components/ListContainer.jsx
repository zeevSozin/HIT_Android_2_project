import { Children } from "react";
import MovieCard from "./MovieCard";
import styles from "./ListContainer.module.css";

function ListContainer({ data }) {
  return (
    <div className={styles.container}>
      {data.map((entry) => (
        <MovieCard data={entry} key={entry.id} />
      ))}
    </div>
  );
}

export default ListContainer;
