import { NavLink } from "react-router-dom";
import styles from "./PageNavigation.module.css";
import { useContext } from "react";
import { UserContext } from "./../App";
import { PiUserCircleCheckLight } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { SlUserUnfollow } from "react-icons/sl";
import { SlUserFollowing } from "react-icons/sl";

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
            <div className={styles.loginButton}>
              <SlUserFollowing size={30} />
              <NavLink
                to="/"
                onClick={handleLogout}
                className={styles.loguotLink}
              >
                {logedInUser.firstName}
              </NavLink>
            </div>
          ) : (
            <div className={styles.loginButton}>
              <SlUserUnfollow size={30} />
              <NavLink to="/login" className={styles.loginLink}>
                Login
              </NavLink>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNavigation;
