import styles from "./UserListContainer.module.css";
import UserRow from "./UserRow";

function UserListContainer({ data }) {
  const topRow = {
    email: "User account",
    firstName: "First name",
    lastName: "Last name",
    role: "Role",
  };
  return (
    <div className={styles.container}>
      <div>
        <ul className={styles.list}>
          <li>User Account</li>
          <li>First name</li>
          <li>Last name</li>
          <li>Role</li>
          <li>Edit user</li>
          <li>Reset password</li>
          <li>Delete user</li>
        </ul>
      </div>
      {data && !data.lenght ? (
        data.map((entry) => <UserRow data={entry} key={entry._id} />)
      ) : (
        <h1>Data is not Awalible ⛔</h1>
      )}
    </div>
  );
}

export default UserListContainer;
