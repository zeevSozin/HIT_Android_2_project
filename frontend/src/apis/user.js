import axios from "axios";
const BASE_URL = "http://localhost:5000";

const axiosUserProvider = axios.create({
  baseURL: BASE_URL,
});

export async function getAllUsers() {
  try {
    console.log("user API - getAllUsers() invoked");
    const response = await axiosUserProvider.get("/user/users");
    console.log("user API - getAllUsers() response:", response.data.users);
    const users = response.data.users.slice(1);
    console.log(users);
    return users;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function updateUser(user) {
  try {
    console.log("user API - updateUser(user) invoked");
    const response = await axiosUserProvider.post("/user/edit", user);
    console.log("user API - updateUser(user) response", response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function resetUserPassword(user) {
  try {
    console.log("user API - restUserPassword(user) invoked");
    const response = await axiosUserProvider.post("/user/password", user);
    console.log("user API - restUserPassword(user) response", response.data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function deleteUser(userId) {
  try {
    console.log("user API - deleteUser(userId) invoked");
    const response = await axiosUserProvider.delete(`/user/${userId}`);
    console.log("user API - deleteUser(userId) response", response.data);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
