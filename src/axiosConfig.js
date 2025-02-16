import axios from "axios";
import { getToken } from "./auth"; // This is your auth.js file

// Create an Axios instance with a base URL
const instance = axios.create({
  baseURL: "https://pr4722.dev.aws.rocket-rez.com/api", // Replace with your API's base URL
});

let token = null; // Store the token in memory to avoid repeated fetches

// Function to ensure the token is fetched and reused
const fetchToken = async () => {
  if (!token) {
    token = await getToken(); // Get the token using client ID and secret
  }
  return token;
};

// Request interceptor to add the token to the Authorization header
instance.interceptors.request.use(
  async (config) => {
    try {
      const jwt = await fetchToken(); // Fetch the token if not already fetched
      if (jwt) {
        config.headers["Authorization"] = `Bearer ${jwt}`; // Add the token to the header
      }
      return config;
    } catch (error) {
      console.error("Error adding token to request:", error);
      throw error;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
