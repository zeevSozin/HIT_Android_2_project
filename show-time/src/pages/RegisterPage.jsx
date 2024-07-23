import RegisterForm from "../components/RegisterForm";
import styles from "./RegisterPage.module.css";
function RegisterPage() {
  return (
    <div className={styles.page}>
      <h1>Register</h1>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
