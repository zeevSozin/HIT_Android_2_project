import axios from "axios";
const BASE_URL = "http://localhost:5000";

const axiosInventoryProvider = axios.create({
  baseURL: BASE_URL,
});

export async function addItem(data) {
  try {
    console.log("post data", data);
    const response = await axiosInventoryProvider.post("/inventory/add", data);
    console.log("response data: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
