import { NavLink } from "react-router-dom";
import styles from "./PageNavigation.module.css";

function PageNavigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/dashBoard">Dash</NavLink>
        </li>
        <li>
          <NavLink to="/inventory">Inventory</NavLink>
        </li>
        <li>
          <NavLink to="/users">users</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.loginLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNavigation;
