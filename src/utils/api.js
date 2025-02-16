// Function to fetch an authentication token
export const fetchToken = async () => {
  try {
    const response = await fetch("/api/v1/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: "randall", // Replace with actual client_id
        client_secret: "randall", // Replace with actual client_secret
        scope: "read_products",
        grant_type: "client_credentials",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching token:", errorData);
      throw new Error(`Failed to fetch token: ${response.status}`);
    }

    const data = await response.json();
    return data.data.access_token;
  } catch (error) {
    console.error("fetchToken error:", error);
    throw error;
  }
};

// Function to fetch products by type (e.g., retail, events)
export const fetchProductsByType = async (token, type) => {
  try {
    const response = await fetch(`/api/v1/headless/products?productType=${type}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching products:", errorData);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("fetchProductsByType error:", error);
    throw error;
  }
};

// Function to fetch product details by product ID
export const fetchProductDetails = async (token, productId) => {
  try {
    const response = await fetch(`/api/v1/headless/products/retail/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching product details:", errorData);
      throw new Error(`Failed to fetch product details: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("fetchProductDetails error:", error);
    throw error;
  }
};

// General function for making GET requests to any API endpoint
export const fetchFromEndpoint = async (token, endpoint) => {
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error fetching from ${endpoint}:`, errorData);
      throw new Error(`Failed to fetch from ${endpoint}: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`fetchFromEndpoint error (${endpoint}):`, error);
    throw error;
  }
};

// Function to fetch event details by event ID
export const fetchEventDetails = async (token, eventId) => {
  try {
    const response = await fetch(`/api/v1/headless/products/event/${eventId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Error fetching event details: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch event details: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("fetchEventDetails error:", error);
    throw error;
  }
};
