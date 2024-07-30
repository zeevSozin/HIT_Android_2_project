import styles from "./ListContainer.module.css";
import MovieCard from "./MovieCard";
import OrderMovieCard from "./inventory/OrderMovieCard";

function ListContainer({ data }) {
  return (
    <div className={styles.container}>
      {data && !data.lenght ? (
        data.map((entry) => <MovieCard data={entry} key={entry.id} />)
      ) : (
        <h1>Data is not Awalible ⛔</h1>
      )}
    </div>
  );
}

export default ListContainer;
