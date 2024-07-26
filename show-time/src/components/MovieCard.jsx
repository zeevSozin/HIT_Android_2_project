import styles from "./MovieCard.module.css";

function MovieCard({ data }) {
  return (
    <div className={styles.card}>
      <h3>{data.original_title}</h3>
      <img src={data.poster_path} alt={data.original_title} />

      {/* <p>{data.overview}</p> */}
      <button>Order now</button>
    </div>
  );
}

export default MovieCard;
