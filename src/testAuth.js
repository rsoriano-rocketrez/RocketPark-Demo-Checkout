import { getToken } from "./auth"; // Adjust the path if `auth.js` is in a different folder

const testAuth = async () => {
  try {
    const token = await getToken(); // Call your function to fetch the token
    console.log("Retrieved Token:", token); // Log the token to confirm it's working
  } catch (error) {
    console.error("Error fetching token:", error); // Log any errors for debugging
  }
};

testAuth();
