import styles from "./RegisterForm.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../App";

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

  async function onSubmit(e) {
    // console.log(response, error, loading);
    e.preventDefault();
    try {
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
        setLogedInUser({
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: "user",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert(error.response ? error.response.data.error : error.message);
    }
  }

  return (
    <div>
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
        <div className={styles.submit}>
          <input
            type="submit"
            name="submit"
            disabled={canSubmit ? "" : "disabled"}
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
