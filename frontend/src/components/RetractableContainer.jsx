import { useContext, useState } from "react";
import styles from "./RetractableContainer.module.css";
import { FcSearch } from "react-icons/fc";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { LoadingContext } from "../App";
import LoadingSpinner from "./LoadingSpinner";

function RetractableContainer({ sidebarContent, sidebarToggle, mainContent }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { isLoading, setIsloading } = useContext(LoadingContext);

  function handleToggleSideBar(e) {
    setIsSideBarOpen((cur) => !cur);
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.sideBar} ${isSideBarOpen ? styles.open : ""}`}>
        <div className={styles.expandButton}>
          {isSideBarOpen ? (
            <FaChevronCircleLeft
              onClick={handleToggleSideBar}
              size={20}
              className={styles.expandButton}
            />
          ) : (
            <FaChevronCircleRight
              onClick={handleToggleSideBar}
              size={20}
              className={styles.expandButton}
            />
          )}
        </div>
        <div
          className={`${styles.sideBarContent} ${
            isSideBarOpen ? styles.open : ""
          }`}
        >
          {sidebarContent}
        </div>
      </div>

      <div className={styles.contentContainer}>
        {isLoading ? <LoadingSpinner isLoading={true} /> : mainContent}
      </div>
    </div>
  );
}

export default RetractableContainer;
