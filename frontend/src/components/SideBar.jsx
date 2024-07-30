import { useState } from "react";
import styles from "./SideBar.module.css";
import SearchBar from "./SearchBar";

function SideBar({ setIsOpen }) {
  function handleSideBarOpen(e) {
    setIsOpen((cur) => (cur = !cur));
    console.log("sidebar clicked");
  }
  return (
    <div className={styles.sideBar}>
      Search
      <button className={styles.sideBarToggle} onClick={handleSideBarOpen}>
        Search
      </button>
      <SearchBar />
    </div>
  );
}

export default SideBar;
