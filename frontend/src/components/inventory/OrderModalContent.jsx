import { useState } from "react";
import styles from "./OrderModalContent.module.css";
import Rating from "react-rating-stars-component";
import { useMutation } from "@tanstack/react-query";
import { addItem } from "./../../apis/Inventory";
import { toast } from "react-toastify";

function OrderModalContent({ data, onClose }) {
  const [price, setPrice] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);
  const [amount, setAmount] = useState(1);

  const orderMutation = useMutation({
    mutationKey: ["addMovies"],
    mutationFn: async (queryData) => await addItem(queryData),
  });

  function handlePlaceOrder(e) {
    toast.promise(
      async () => {
        await orderMutation.mutate({
          ...data,
          avalibleAmount: amount,
          soldAmount: 0,
          price: price,
          retailPrice: retailPrice,
        });
      },
      {
        pending: "Placing order...",
        success: {
          render() {
            onClose();
            return "Order placed";
          },
        },
        error: "Something went wrong",
      }
    );
  }

  function handleSetPrice(e) {
    const val = e.target.value;
    setPrice((cur) => (cur = val));
  }

  function handleSetRetailPrice(e) {
    const val = e.target.value;
    setRetailPrice((cur) => (cur = val));
  }

  function handleSetAmount(e) {
    const val = e.target.value;
    setAmount((cur) => (cur = val));
  }

  return (
    <div className={styles.container}>
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
      <div className={styles.orderContent}>
        <div>
          <label>
            <strong>Price: $ </strong>
          </label>
          <input
            type="number"
            placeholder="0"
            value={price}
            onChange={handleSetPrice}
          />
        </div>
        <div>
          <label>
            <strong>Retail Price: $ </strong>
          </label>
          <input
            type="number"
            placeholder="0"
            value={retailPrice}
            onChange={handleSetRetailPrice}
          />
        </div>
        <div>
          <label>
            <strong>Amount </strong>
          </label>
          <input
            type="number"
            placeholder="1"
            min="1"
            value={amount}
            onChange={handleSetAmount}
          />
        </div>
        <button onClick={handlePlaceOrder}>Place order</button>
      </div>
    </div>
  );
}

export default OrderModalContent;
