import { useContext, useState } from "react";
import {
  ResetPasswordUserModalContext,
  SelectedUserContext,
} from "../../pages/UsersPage";
import styles from "./ResetPasswordModalContent.module.css";
import { toast } from "react-toastify";
import { resetUserPassword } from "../../apis/user";

function ResetPasswordModalContent() {
  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);
  const { isResetPasswordModalOpen, SetIsResetPasswordModalOpen } = useContext(
    ResetPasswordUserModalContext
  );

  const [isPasswordMatches, setIsPasswordMatches] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handlePasswordMatch(e) {
    const val = e.target.value;
    setConfirmPassword((cur) => (cur = val));
    if (password === "") setIsPasswordMatches(false);
    if (password !== val) setIsPasswordMatches(false);
    if (password === val) setIsPasswordMatches(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted");
    let user = selectedUser;
    user.password = password;
    console.log(user);

    toast.promise(resetUserPassword(user), {
      pending: "Reseting password...",
      success: {
        render() {
          SetIsResetPasswordModalOpen(false);
          return "Reset completed";
        },
      },
      error: "Something got wrong",
    });
  }

  function handleCancel(e) {
    SetIsResetPasswordModalOpen(false);
  }

  return (
    <div className={styles.container}>
      <h2>Resete {selectedUser.firstName}'s password</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="password">New Password: </label>
          <input
            id="password"
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword((cur) => (cur = e.target.value))}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            id="confirmPassword"
            type="password"
            minLength={6}
            value={confirmPassword}
            onChange={handlePasswordMatch}
          />
        </div>
        <button
          className={`${styles.buttonSubmit} ${
            !isPasswordMatches ? styles.disabled : ""
          }`}
          disabled={isPasswordMatches ? false : true}
        >
          Submit
        </button>
      </form>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default ResetPasswordModalContent;
