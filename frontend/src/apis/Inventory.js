import axios from "axios";
const BASE_URL = "http://localhost:5000";

const axiosInventoryProvider = axios.create({
  baseURL: BASE_URL,
});

export async function getItems() {
  try {
    console.log("get Items");
    const response = await axiosInventoryProvider.get("/inventory");
    console.log("response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function addItem(data) {
  try {
    console.log("post addItem data", data);
    const response = await axiosInventoryProvider.post("/inventory/add", data);
    console.log("response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function updateItem(data) {
  try {
    console.log("post updateItem data", data);
    const response = await axiosInventoryProvider.post(
      "/inventory/update",
      data
    );
    console.log("response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function deleteItem(id) {
  try {
    console.log("deleteItem id", id);
    const response = await axiosInventoryProvider.delete(`/inventory/${id}`);
    console.log("response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
