import styles from "./LoginPage.module.css";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className={styles.page}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
