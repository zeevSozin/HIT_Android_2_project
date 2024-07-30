import styles from "./LoginPage.module.css";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
