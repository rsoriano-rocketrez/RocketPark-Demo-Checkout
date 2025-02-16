import React, { useState } from "react";
import { getToken } from "../auth"; // Adjust the path based on where your `auth.js` file is located

const AuthTestPage = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleFetchToken = async () => {
    try {
      const fetchedToken = await getToken(); // Call your token-fetching function
      setToken(fetchedToken); // Update the state with the retrieved token
      setError(""); // Clear any previous error
    } catch (err) {
      console.error("Error fetching token:", err);
      setError("Failed to fetch token. Check the console for details.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">Auth Test</h1>
        <button
          onClick={handleFetchToken}
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Fetch Token
        </button>
        {token && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800">Retrieved Token:</h2>
            <p className="text-sm text-gray-600 break-all bg-gray-100 p-2 rounded-lg">{token}</p>
          </div>
        )}
        {error && (
          <div className="mt-6 text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthTestPage;
