import { Link } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { useContext, useState } from "react";
import { UserContext } from "./../App";
import { useNavigate } from "react-router-dom";
import jwtDecode from "./../util/jwtDecoder";
import axios from "axios";
import { toast } from "react-toastify";

function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logedInUser, setLogedInUser } = useContext(UserContext);

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
      const response = await toast.promise(
        axios.post("http://localhost:5000/authentication/validate", payload),
        {
          pending: "Logging in ...",
          success: {
            render({ data }) {
              console.log(data);
              if (data.status === 200) {
                const [isTokenExpired, decodedToken] = jwtDecode(
                  data.data.token
                );
                console.log("decodec token:", decodedToken);
                if (isTokenExpired) {
                  navigate("/login");
                  throw new Error("session expired");
                } else {
                  setLogedInUser({
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastNmae,
                    email: decodedToken.email,
                    role: decodedToken.role,
                    userId: decodedToken.userId,
                  });
                  navigate("/");
                  return `Wellcome ${decodedToken.firstName}`;
                }
              }
            },
          },
          error: {
            render({ data }) {
              return data.response.data.error;
            },
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.frame}>
      <h1>Logint to account</h1>
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
            minLength={6}
            required={true}
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
    </div>
  );
}

export default LoginForm;
