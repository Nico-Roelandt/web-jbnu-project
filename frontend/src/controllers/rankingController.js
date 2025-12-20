import axios from "axios";

const API_URL = "http://localhost:3000";

/**
 * Victories
 */
export const getVictoriesRanking = async () => {
  const res = await axios.get(`${API_URL}/rankings/victories`);
  return res.data;
};

export const getVictoriesTop3 = async () => {
  const res = await axios.get(`${API_URL}/rankings/victories/top3`);
  return res.data;
};

/**
 * Attempts
 */
export const getAttemptsRanking = async () => {
  const res = await axios.get(`${API_URL}/rankings/attempts`);
  return res.data;
};

export const getAttemptsTop3 = async () => {
  const res = await axios.get(`${API_URL}/rankings/attempts/top3`);
  return res.data;
};

/**
 * Games
 */
export const getGamesRanking = async () => {
  const res = await axios.get(`${API_URL}/rankings/games`);
  return res.data;
};

export const getGamesTop3 = async () => {
  const res = await axios.get(`${API_URL}/rankings/games/top3`);
  return res.data;
};
