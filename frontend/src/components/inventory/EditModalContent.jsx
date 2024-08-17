import { useContext, useState } from "react";
import styles from "./EditModalContent.module.css";
import { toast } from "react-toastify";
import { deleteItem, getItems, updateItem } from "../../apis/Inventory";
import { useMutation } from "@tanstack/react-query";
import { InventoryMovieContext, ShownMovieContext } from "../../App";

function EditModalContent({ data, onClose }) {
  console.log("edit data", data);
  const [price, setPrice] = useState(data.price);
  const [retailPrice, setRetailPrice] = useState(data.retailPrice);
  const [avalibleAmount, setAvalibleAmount] = useState(data.avalibleAmount);
  const [isActive, setIsActive] = useState(data.isActive);
  const { movies, setMovies } = useContext(ShownMovieContext);
  const { inventoryMovies, setInventoryMovies } = useContext(
    InventoryMovieContext
  );

  const inventoryMutation = useMutation({
    queryKey: ["inventory"],
    mutationFn: async () => {
      const data = await getItems();
      setMovies(data);
      setInventoryMovies(data);
      return data;
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    data.price = price;
    data.retailPrice = retailPrice;
    data.avalibleAmount = avalibleAmount;
    toast.promise(updateItem(data), {
      pending: "Updating item ...",
      success: {
        render({ data }) {
          onClose();
          return "Item Updated";
        },
      },

      error: " Failed to update",
    });
  }

  function handlePriceChanged(e) {
    const val = e.target.value;
    setPrice((cur) => (cur = val));
  }

  function handleRetailPriceChanged(e) {
    const val = e.target.value;
    setRetailPrice((cur) => (cur = val));
  }

  function handleAmountChangd(e) {
    const val = e.target.value;
    setAvalibleAmount((cur) => (cur = val));
  }
  function handleDelete(e) {
    toast.promise(deleteItem(data._id), {
      pending: "Deleting item ...",
      success: {
        render({ data }) {
          onClose();
          inventoryMutation.mutate();
          return "Item Deleted";
        },
      },

      error: " Failed to update",
    });
  }
  return (
    <div className={styles.main}>
      <h1>Edit {data.original_title}</h1>
      <div className={styles.container}>
        <img src={data.poster_path} alt={data.original_title} />
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.row}>
              <label htmlFor="price"> Price: </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChanged}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="retailPrice">Retail price: </label>
              <input
                type="number"
                id="retailPrice"
                value={retailPrice}
                onChange={handleRetailPriceChanged}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="amount">Avalible amount: </label>
              <input
                type="number"
                id="amount"
                value={avalibleAmount}
                onChange={handleAmountChangd}
              />
            </div>
            {/* <div className={styles.row}>
              <label htmlFor="active">Active </label>
              <input type="checkbox" id="active" value={isActive} />
            </div> */}
            <button>Submit</button>
          </form>
          <div className={styles.deleteButton} onClick={handleDelete}>
            Delete From Stock 🗑️
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModalContent;
