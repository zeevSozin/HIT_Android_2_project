import { useContext, useState } from "react";
import styles from "./MovieCard.module.css";
import { CardModeContext } from "../App";
import MovieModalContent from "./MovieModalContent";
import OrderModalContent from "./inventory/OrderModalContent";
import BuyModalContent from "./home/BuyModalContent";
import EditModalContent from "./inventory/EditModalContent";
import Modal from "./Modal";
import StarRating from "./StarRating";

function MovieCard({ data }) {
  const { cardMode, setCardMode } = useContext(CardModeContext);
  const [isDetailsOpen, setIsDetailesOpen] = useState(false);
  const [isFunctionOpen, setIsFunctionOpen] = useState(false);

  function handleShowDetaies(e) {
    setIsDetailesOpen((cur) => (cur = true));
  }

  function handleFuncButton(e) {
    setIsFunctionOpen((cur) => (cur = true));
  }

  return (
    <div className={styles.card}>
      <h3>{data.original_title}</h3>
      <img src={data.poster_path} alt={data.original_title} />
      <StarRating rating={data.vote_average} />
      {cardMode === "sell" && (
        <strong>Price: ${data.retailPrice ? data.retailPrice : 0}</strong>
      )}
      {cardMode === "edit" && (
        <div>
          <div>
            <strong>Order Price: ${data.price ? data.price : 0}</strong>
          </div>
          <div>
            <strong>
              Retail Price: ${data.retailPrice ? data.retailPrice : 0}
            </strong>
          </div>
        </div>
      )}
      <div className={styles.bottomButtonConatiner}>
        <button onClick={handleShowDetaies}>Detailes</button>
        <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailesOpen(false)}>
          <MovieModalContent data={data} />
        </Modal>
        {cardMode === "sell" && (
          <>
            <button onClick={handleFuncButton}>Add to cart 🛒</button>
            <Modal
              isOpen={isFunctionOpen}
              onClose={() => setIsFunctionOpen(false)}
            >
              <BuyModalContent data={data} />
            </Modal>
          </>
        )}

        {cardMode === "order" && (
          <>
            <button onClick={handleFuncButton}>Order now</button>
            <Modal
              isOpen={isFunctionOpen}
              onClose={() => setIsFunctionOpen(false)}
            >
              <OrderModalContent data={data} />
            </Modal>
          </>
        )}

        {cardMode === "edit" && (
          <>
            <button onClick={handleFuncButton}>Edit</button>
            <Modal
              isOpen={isFunctionOpen}
              onClose={() => setIsFunctionOpen(false)}
            >
              <EditModalContent data={data} />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
