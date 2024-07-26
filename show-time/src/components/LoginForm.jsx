import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { useContext, useState } from "react";
import { UserContext } from "./../App";
import { useNavigate } from "react-router-dom";
import jwtDecode from "./../util/jwtDecoder";
import axios from "axios";

function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLogedInUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handleUserEmailChanged(e) {
    let value = e.target.value;
    setUserEmail((userEmail) => (userEmail = value));
  }

  function handlePasswordChanged(e) {
    let value = e.target.value;
    setPassword((password) => (password = value));
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      const payload = { email: userEmail, password: password };
      const response = await axios.post(
        "http://localhost:5000/authentication/validate",
        payload
      );
      if (response.status === 200) {
        // TODO: make a call to backend to recive the user detailes or think how to decompose token
        const [isTokenExpired, decodedToken] = jwtDecode(response.data.token);
        console.log("decodec token:", decodedToken);
        if (isTokenExpired) navigate("/login");
        else {
          setLogedInUser({
            firstName: decodedToken.firstName,
            lastName: decodedToken.lastNmae,
            email: decodedToken.email,
            role: decodedToken.role,
          });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      alert(error.response ? error.response.data.error : error.message);
    }
  }
  return (
    <main className={styles.frame}>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.row}>
          <label htmlFor="username">User Email</label>
          <input
            type="email"
            id="username"
            placeholder="example@domain.com"
            value={userEmail}
            onChange={handleUserEmailChanged}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChanged}
          />
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
