import styles from "./PurchaseItem.module.css";

function PurchaseItem({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={data.poster_path} alt={data.original_title} />
      </div>
      <div className={styles.detaileContainer}>
        <h4>{data.original_title}</h4>
        <h5>Price: ${data.retailPrice}</h5>
      </div>
    </div>
  );
}

export default PurchaseItem;
