import RegisterForm from "../components/RegisterForm";
import styles from "./RegisterPage.module.css";
function RegisterPage() {
  return (
    <div className={styles.page}>
      <h2>Register to ShowTime 🎬</h2>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
