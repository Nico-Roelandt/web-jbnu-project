import axios from "axios";

/**
 * Simulate a Wordle game (frontend only)
 * Then update user stats in backend
 */
export const playFakeGame = async (userId, modeId) => {
  // fake random attempts between 2 and 6
  const attempts = Math.floor(Math.random() * 5) + 2;

  // fake win (always true for demo)
  const win = true;

  // fake word (only for display)
  const words = ["WORDLE", "PUZZLE", "ORANGE", "PLAYER"];
  const word = words[Math.floor(Math.random() * words.length)];

  // update user stats in backend
  await axios.put(`http://localhost:3000/api/users/${userId}/stats`, {
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
