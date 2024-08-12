import { useContext, useState } from "react";
import styles from "./UserRow.module.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { Tooltip } from "react-tippy";
import { toast } from "react-toastify";
import { updateUser } from "../../apis/user";
import {
  DeleteUserModalContext,
  ResetPasswordUserModalContext,
  SelectedUserContext,
} from "../../pages/UsersPage";

function UserRow({ data }) {
  const [isEdited, setIsEdited] = useState(false);
  const [user, setUser] = useState(data);
  const { isResetPasswordModalOpen, SetIsResetPasswordModalOpen } = useContext(
    ResetPasswordUserModalContext
  );
  const { isDeleteUserModalOpen, setIsDeleteUserModalOpen } = useContext(
    DeleteUserModalContext
  );
  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);

  function handleEdit(e) {
    setIsEdited(true);
  }

  function handleSave(e) {
    toast.promise(updateUser(user), {
      pending: "Updating user",
      success: "User Updated",
      error: "Something got wrong",
    });
    setIsEdited(false);
  }

  function handleUserChange(e) {
    const val = e.target.value;
    switch (e.target.id) {
      case "firstName":
        setUser((cur) => ({ ...cur, firstName: val }));
        break;
      case "lastName":
        setUser((cur) => ({ ...cur, lastName: val }));
        break;
      case "role":
        setUser((cur) => ({ ...cur, role: val }));
        break;
      default:
        return Error("Unrecognized");
    }
  }

  function handleResetPassword(e) {
    setSelectedUser((cur) => (cur = user));
    SetIsResetPasswordModalOpen(true);
  }

  function handleDelete(e) {
    setSelectedUser((cur) => (cur = user));
    setIsDeleteUserModalOpen(true);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>{user.email}</li>
        {!isEdited ? (
          <li>{user.firstName}</li>
        ) : (
          <input
            type="text"
            id="firstName"
            value={user.firstName}
            onChange={handleUserChange}
          />
        )}
        {!isEdited ? (
          <li>{user.lastName}</li>
        ) : (
          <input
            type="text"
            id="lastName"
            value={user.lastName}
            onChange={handleUserChange}
          />
        )}
        {!isEdited ? (
          <li>{user.role}</li>
        ) : (
          <select value={user.role} onChange={handleUserChange} id="role">
            <option>manager</option>
            <option>user</option>
          </select>
        )}
        {!isEdited ? (
          <Tooltip title="Edit user" delay={[800, 0]}>
            <button className={styles.buttonEdit} onClick={handleEdit}>
              <FaEdit className={styles.editIcon} />
            </button>
          </Tooltip>
        ) : (
          <Tooltip title="Save user" delay={[800, 0]}>
            <button className={styles.buttonEdit} onClick={handleSave}>
              <IoMdSave className={styles.saveIcon} />
            </button>
          </Tooltip>
        )}
        <Tooltip title="Reset user's password" delay={[800, 0]}>
          <button className={styles.buttonReset} onClick={handleResetPassword}>
            <MdLockReset className={styles.reserPasswordIcon} />
          </button>
        </Tooltip>
        <Tooltip title="Delete user" delay={[800, 0]}>
          <button className={styles.buttonDelete} onClick={handleDelete}>
            <MdDeleteForever className={styles.deleteIcon} />
          </button>
        </Tooltip>
      </ul>
    </div>
  );
}

export default UserRow;
