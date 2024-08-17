import { useContext, useEffect, useState } from "react";
import styles from "./UsersSideBarContent.module.css";
import { ShownUsersContext, UsersContext } from "../../pages/UsersPage";
function UsersSideBarContent() {
  const [nameFilter, setNameFilter] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const { users, setUsers } = useContext(UsersContext);
  const { shownUsers, setShownUsers } = useContext(ShownUsersContext);

  useEffect(() => setShownUsers(users), []);

  function handleNameFilter(e) {
    const val = e.target.value;
    setNameFilter((cur) => (cur = val));
    if (val === "") setShownUsers(users);
    else {
      setShownUsers((cur) => {
        const filterdUsers = users.filter(
          (user) =>
            user.firstName.toLowerCase().includes(val.toLowerCase()) ||
            user.lastName.toLowerCase().includes(val.toLowerCase())
        );
        return filterdUsers;
      });
    }
  }
  function handleRoleFilter(e) {
    const val = e.target.value;
    setSelectedRole((cur) => (cur = val));
    if (val === "") setShownUsers(users);
    else {
      setShownUsers((cur) => {
        const filterdUsers = users.filter((user) => user.role === val);
        return filterdUsers;
      });
    }
  }
  return (
    <div className={styles.container}>
      <h3>Search</h3>
      <div className={styles.row}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          value={nameFilter}
          onChange={handleNameFilter}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="role">Role:</label>
        <select value={selectedRole} id={"role"} onChange={handleRoleFilter}>
          <option key={0} value={""}>
            All
          </option>
          <option key={1} value={"manager"}>
            Manager
          </option>
          <option key={2} value={"user"}>
            User
          </option>
        </select>
      </div>
    </div>
  );
}

export default UsersSideBarContent;
