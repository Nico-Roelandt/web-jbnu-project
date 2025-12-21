import axios from "axios";
import api from "@/services/api";

/**
 * Simulate a Wordle game (frontend only)
 * Then update user stats in backend (via JWT)
 */
export const playFakeGame = async (modeId) => {
  const attempts = Math.floor(Math.random() * 5) + 2;
  const win = true;

  const words = ["WORDLE", "PUZZLE", "ORANGE", "PLAYER"];
  const word = words[Math.floor(Math.random() * words.length)];

  await api.post("/games", {
    word_id: 1,
    difficulty_id: 1, 
    mode_id: modeId
  });

  await api.patch("/users/stats", {
    win: win.toString(),
    attempts
  });

  return {
    word,
    attempts,
    win,
    modeId
  };
};

