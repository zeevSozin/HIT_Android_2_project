import styles from "./ItemListContainer.module.css";

function ItemListConatiner({ className, fdirection = "row", children }) {
  return (
    <div
      className={className ? className : styles.container}
      style={{ flexDirection: fdirection }}
    >
      {children}
    </div>
  );
}

export default ItemListConatiner;
