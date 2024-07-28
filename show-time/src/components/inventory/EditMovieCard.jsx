import { useState } from "react";
import styles from "./EditMovieCard.module.css";
import Modal from "../Modal";
import MovieModalContent from "../MovieModalContent";
import OrderModalContent from "./OrderModalContent";

function EditMovieCard({ data }) {
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
        <span>Price: {data.price}</span>
        <span>Retail price: {data.retailPrice}</span>
        <span>Amount in stock: {data.avalibleAmount}</span>
        <span>Sold units: {data.avalibleAmount}</span>
        <div className={styles.soldAmount}>
          <button onClick={handleShowDetaies}>Detailes</button>
          <Modal
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailesOpen(false)}
          >
            <MovieModalContent data={data} />
          </Modal>
          <button onClick={handleOrder}>Edit</button>

          <Modal isOpen={isOrderOpen} onClose={() => setIsOrderOpen(false)}>
            <OrderModalContent data={data} />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default EditMovieCard;
