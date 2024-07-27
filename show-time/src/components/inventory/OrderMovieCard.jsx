import { useContext, useState } from "react";
import Modal from "../Modal";
import styles from "./OrderMovieCard.module.css";
import MovieDetailes from "./../MovieDetailes";
import OrderModalContent from "./OrderModalContent";

function OrderMovieCard({ data }) {
  const [isDetailsOpen, setIsDetailesOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  function handleShowDetaies(e) {
    setIsDetailesOpen((cur) => (cur = true));
  }

  function handleOrder(e) {
    setIsOrderOpen((cur) => (cur = true));
  }

  return (
    <div>
      <div className={styles.card}>
        <h3>{data.original_title}</h3>
        <img src={data.poster_path} alt={data.original_title} />
        <span>Rating: {data.vote_average}</span>
        <div className={styles.bottomButtonConatiner}>
          <button onClick={handleShowDetaies}>Detailes</button>
          <Modal
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailesOpen(false)}
          >
            <MovieDetailes data={data} />
          </Modal>
          <button onClick={handleOrder}>Order now</button>

          <Modal isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)}>
            <OrderModalContent data={data} />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default OrderMovieCard;
