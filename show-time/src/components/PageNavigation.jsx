import { NavLink } from "react-router-dom";
import styles from "./PageNavigation.module.css";
import { useContext } from "react";
import { UserContext } from "./../App";

function PageNavigation() {
  const { logedInUser, setLogedInUser } = useContext(UserContext);

  function handleLogout(e) {
    console.log("handle logout");

    setLogedInUser({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
    });
    console.log("loged in user context:", logedInUser);
  }
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {(logedInUser.role === "manager" || logedInUser.role === "admin") && (
            <NavLink to="/dashBoard">Dash</NavLink>
          )}
        </li>
        <li>
          {(logedInUser.role === "manager" || logedInUser.role === "admin") && (
            <NavLink to="/inventory">Inventory</NavLink>
          )}
        </li>
        <li>
          {logedInUser.role === "admin" && <NavLink to="/users">users</NavLink>}
        </li>
        <li>
          {logedInUser.email !== "" ? (
            <NavLink
              to="/"
              onClick={handleLogout}
              className={styles.loguotLink}
            >
              {logedInUser.firstName}
            </NavLink>
          ) : (
            <NavLink to="/login" className={styles.loginLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNavigation;
