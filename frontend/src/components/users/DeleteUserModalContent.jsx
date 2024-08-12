import styles from "./DeleteUserModalContent.module.css";
import { useContext } from "react";
import {
  DeleteUserModalContext,
  SelectedUserContext,
  UsersContext,
} from "../../pages/UsersPage";
import { toast } from "react-toastify";
import { deleteUser } from "../../apis/user";

function DeleteUserModalContent() {
  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);
  const { isDeleteUserModalOpen, setIsDeleteUserModalOpen } = useContext(
    DeleteUserModalContext
  );
  const { users, setUsers } = useContext(UsersContext);

  function handleCancel(e) {
    setIsDeleteUserModalOpen(false);
  }

  function handleDelete(e) {
    toast.promise(deleteUser(selectedUser._id), {
      pending: " Deleting User",
      success: {
        render() {
          setIsDeleteUserModalOpen(false);
          setUsers([]);
          return "User Deleted";
        },
      },
      error: "Something got wrong",
    });
  }
  return (
    <div className={styles.container}>
      <h3>You are about to delete {selectedUser.email} are you sure?</h3>
      <button className={styles.buttonCancel} onClick={handleCancel}>
        Cancel
      </button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteUserModalContent;
