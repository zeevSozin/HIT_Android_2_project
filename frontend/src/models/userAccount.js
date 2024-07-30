class UserAccount {
  constructor(
    fistName = "",
    lastName = "",
    email = "",
    password = "",
    role = "customer"
  ) {
    this.fistName = fistName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
  set firstName(value) {
    this.firstName = value;
  }
  set lastNamel(value) {
    this.lastNamel = value;
  }
  email;
  password;
  role;
}

export default UserAccount;
