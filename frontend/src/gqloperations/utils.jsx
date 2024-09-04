// Function to get the user ID from the token
export const getUserIdFromToken = (token) => {
  if (!token || typeof token !== "string") {
    console.error("No token provided or token is not a string");
    return null;
  }

  try {
    const parts = token.split(".");

    if (parts.length !== 3) {
      throw new Error("Token is not a valid JWT");
    }

    const payload = JSON.parse(atob(parts[1]));

    if (payload && payload.user_id) {
      return payload.user_id;
    } else {
      console.error("User ID not found in token");
      return null;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}; // We can use it anywhere
