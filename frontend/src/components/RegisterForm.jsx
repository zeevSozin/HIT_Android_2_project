import styles from "./RegisterForm.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../App";
import jwtDecode from "../util/jwtDecoder";
import { toast } from "react-toastify";

function RegisterForm() {
  const { logedInUser, setLogedInUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  const navigate = useNavigate();

  //   const { response, error, loading, fetchData } = useAxios();
  //   const { loading, fetchData } = useAxios();

  function onFirstNameChanged(e) {
    let value = e.target.value;
    setFirstName((firstName) => (firstName = value));
  }
  function onLastNameChanged(e) {
    let value = e.target.value;
    setlastName((lastName) => (lastName = value));
  }
  function onEmailChanged(e) {
    let value = e.target.value;
    setEmail((email) => (email = value));
  }
  function onPasswordChanged(e) {
    let value = e.target.value;
    setPassword((password) => (password = value));
  }
  function onConfirmPasswordChanged(e) {
    let value = e.target.value;
    setConfirmPassword((confirmPassword) => value);
    if (value === password) {
      setCanSubmit((canSubmit) => true);
    } else {
      setCanSubmit((canSubmit) => false);
    }
  }

  function resetFields() {
    setFirstName("");
    setlastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function registrUser() {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    const resopnse = await axios.post(
      "http://localhost:5000/authentication/register",
      payload
    );
    console.log(resopnse);
    if (resopnse.status === 201) {
      const [isTokenExpired, decodedToken] = jwtDecode(resopnse.data.token);
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
      }
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    toast.promise(registrUser(), {
      pending: "Registering ....",
      success: `Wellcome ${firstName}`,
      error: {
        render(error) {
          console.log(error);
          resetFields();
          return error.data.response.data.error;
        },
      },
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.row}>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={onFirstNameChanged}
          />
        </div>
        <div className={styles.row}>
          <label>Last name</label>
          <input
            type="text"
            name="lasttName"
            value={lastName}
            onChange={onLastNameChanged}
          />
        </div>
        <div className={styles.row}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onEmailChanged}
          />
        </div>
        <div className={styles.row}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onPasswordChanged}
          />
        </div>
        <div className={styles.row}>
          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onConfirmPasswordChanged}
          />
        </div>
        <button
          className={styles.submit}
          disabled={canSubmit ? "" : "disabled"}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
