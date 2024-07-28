import styles from "./MovieModalContent.module.css";
import { genresDict } from "../data/genresDict";
import Rating from "react-rating-stars-component";
import YoutubeEmbed from "./YoutubeEmbeded";

function MovieModalContent({ data }) {
  return (
    <div className={styles.conatiner}>
      <div className={styles.content}>
        <img src={data.poster_path} alt={data.original_title} />
        <div className={styles.movieDetailes}>
          <h1>{data.original_title}</h1>
          <p>{data.overview}</p>
          <p>
            <strong>Genres: </strong>
            {data.genre_ids.map((genre) => `${genre}, `)}
          </p>
          <p>
            <strong>Release Date: </strong>
            {data.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {data.runtime} minutes
          </p>
          <p>
            <strong>Rating: {data.vote_average.toFixed(1)}</strong>
          </p>
          <Rating
            count={10}
            value={data.vote_average.toFixed(1)}
            size={24}
            activeColor="#ffd700"
            edit={false}
            isHalf={true}
          />
        </div>
      </div>
      {data.embeded_youtube && (
        <div className={styles.trailer}>
          <h2>Trailer</h2>
          <YoutubeEmbed embedId={data.embeded_youtube} />
        </div>
      )}
    </div>
  );
}

export default MovieModalContent;
