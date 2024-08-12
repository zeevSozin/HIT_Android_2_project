import axios from "axios";
const BASE_URL = "http://localhost:5000";

const axiosCartProvider = axios.create({
  baseURL: BASE_URL,
});

export async function addToCart(data) {
  try {
    console.log(" post addToCart data", data);
    const response = await axiosCartProvider.post("/cart/addItem", data);
    console.log("response data: ", response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function submitPurchse(userId) {
  try {
    console.log(" GET submitPurchase userId", userId);
    const response = await axiosCartProvider.get(`/cart/submit/${userId}`);
    console.log("response data: ", response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
export async function checkout(data) {
  try {
    console.log(" POST checkout data", data);
    const response = await axiosCartProvider.post(`/cart/checkout`, data);
    console.log("response data: ", response.data);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
