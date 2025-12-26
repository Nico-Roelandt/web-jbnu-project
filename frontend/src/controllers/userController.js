import axios from "axios";
import api from "@/services/api";

const API_URL = "http://localhost:3000";

/**
 * Get user by id
 */
export const getUserById = async (id) => {
  const res = await api.get(`/users/${id}`)
  return res.data
}

/**
 * Get all users (used later for ranking)
 */
export const getUsers = async ({ page = 1, size = 10, keyword = "" } = {}) => {
  const response = await axios.get(`${API_URL}/users`, {
    params: { page, size, keyword }
  });

  return response.data;
};

/**
 * Update user stats after a game
 */
export const updateUserStats = async (userId, win, attempts) => {
  const response = await axios.put(
    `${API_URL}/users/${userId}/stats`,
    {
      win: win.toString(),
      attempts
    }
  );

  return response.data;
};

/**
 * Get user rankings (victories, attempts, games)
 */
export const getUserRankings = async (userId) => {
  const res = await api.get(`/users/${userId}/rankings`);
  return res.data;
};