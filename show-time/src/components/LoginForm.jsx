import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";

function LoginForm() {
  return (
    <main className={styles.frame}>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="username">User name</label>
          <input type="text" id="username" />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button>Login</button>
        <div className={styles.regiter}>
          Dont have an account?
          <Link to="/register"> Register</Link>
        </div>
      </form>
    </main>
  );
}

export default LoginForm;
