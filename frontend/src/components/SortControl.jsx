import { useState } from "react";
import styles from "./SortControl.module.css";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

function SortControl({ title, type, active, onSortAsc, onSortDesc }) {
  const [isAsc, setIsAsc] = useState(true);

  function handleClick(e) {
    isAsc ? onSortAsc() : onSortDesc();
    setIsAsc((cur) => (cur = !cur));
  }

  return (
    <div
      className={`${styles.container} ${active ? styles.active : ""}`}
      onClick={handleClick}
    >
      <IconContext.Provider value={{ className: styles.icons }}>
        <div className={styles.title}>{title}</div>
        {type === "txt" && (isAsc ? <FaSortAlphaUpAlt /> : <FaSortAlphaDown />)}
        {type === "num" &&
          (!isAsc ? <FaSortAmountDownAlt /> : <FaSortAmountDown />)}
      </IconContext.Provider>
    </div>
  );
}

export default SortControl;
