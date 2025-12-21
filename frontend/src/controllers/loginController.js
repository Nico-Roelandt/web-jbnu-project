import axios from "axios";

const API_URL = "http://localhost:3000";

/**
 * Login
 */
export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password
  });

  const token = response.data.token;

  localStorage.setItem("token", token);

  return token;
};

/**
 * Logout
 */
export const logout = () => {
  localStorage.removeItem("token");
};
