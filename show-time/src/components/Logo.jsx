import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img
        className={styles.logo}
        src="/showtime-logo-black-and-white.png"
        alt="Show Time logo"
      />
    </Link>
  );
}
export default Logo;
