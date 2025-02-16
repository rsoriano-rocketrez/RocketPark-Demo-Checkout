import axios from "axios";

// Hardcoded client credentials (replace with actual values)
const clientCredentials = {
  client_id: "randall",
  client_secret: "randall",
  scope: "read_products",
  grant_type: "client_credentials", // Commonly required for client-based authentication
};

// Fetch the JWT token
export const getToken = async () => {
  try {
    const response = await axios.post("https://pr4722.dev.aws.rocket-rez.com/api/v1/oauth2/token", clientCredentials);
    const token = response.data.access_token;
    console.log("Token retrieved:", token);
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw new Error("Failed to fetch token.");
  }
};
