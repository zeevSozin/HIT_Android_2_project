import { useContext, useEffect, useState } from "react";
import styles from "./RetractableContainer.module.css";
import { FcSearch } from "react-icons/fc";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { TbListSearch } from "react-icons/tb";
import { LoadingContext } from "../App";
import LoadingSpinner from "./LoadingSpinner";

function RetractableContainer({ sidebarContent, iconType, mainContent }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { isLoading, setIsloading } = useContext(LoadingContext);
  const [openIcon, setOpenIcon] = useState(
    <RiMenuUnfold4Line
      onClick={handleToggleSideBar}
      size={30}
      className={styles.expandButton}
    />
  );
  const [closeIcon, setCloseIcon] = useState(
    <RiMenuUnfold3Line
      onClick={handleToggleSideBar}
      size={30}
      className={styles.expandButton}
    />
  );

  function handleToggleSideBar(e) {
    setIsSideBarOpen((cur) => !cur);
  }

  function processOpenIcon() {
    switch (iconType) {
      case "cart":
        setOpenIcon(
          (cur) =>
            (cur = (
              <MdOutlineShoppingCartCheckout
                onClick={handleToggleSideBar}
                size={30}
                className={styles.expandButton}
              />
            ))
        );
        break;
      case "search":
        setOpenIcon(
          (cur) =>
            (cur = (
              <TbListSearch
                onClick={handleToggleSideBar}
                size={30}
                className={styles.expandButton}
              />
            ))
        );
        break;
      default:
        setOpenIcon(
          (cur) =>
            (cur = (
              <RiMenuUnfold4Line
                onClick={handleToggleSideBar}
                size={30}
                className={styles.expandButton}
              />
            ))
        );
    }
  }
  function processCloseIcon() {
    switch (iconType) {
      case "cart":
        setCloseIcon(
          (cur) =>
            (cur = (
              <MdOutlineShoppingCartCheckout
                onClick={handleToggleSideBar}
                size={30}
                className={styles.expandButton}
              />
            ))
        );
        break;
      case "search":
        setCloseIcon(
          (cur) =>
            (cur = (
              <TbListSearch
                onClick={handleToggleSideBar}
                size={30}
                className={styles.expandButton}
              />
            ))
        );
        break;
      default:
        setCloseIcon(
          (cur) =>
            (cur = (
              <RiMenuUnfold3Line
                onClick={handleToggleSideBar}
                size={30}
                className={styles.expandButton}
              />
            ))
        );
    }
  }

  useEffect(() => {
    processOpenIcon();
    processCloseIcon();
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.sideBar} ${isSideBarOpen ? styles.open : ""}`}>
        <div className={styles.expandButton}>
          {isSideBarOpen ? openIcon : closeIcon}
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
