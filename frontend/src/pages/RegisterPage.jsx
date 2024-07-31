import RegisterForm from "../components/RegisterForm";
import styles from "./RegisterPage.module.css";
function RegisterPage() {
  return (
    <div className={styles.page}>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
