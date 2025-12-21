import api from "@/services/api";

/**
 * Fetch paginated users with optional keyword
 */
export const getUsers = async (page = 1, size = 15, keyword = "") => {
  const res = await api.get(`/users?page=${page}&size=${size}&keyword=${keyword}`);
  return {
    items: res.data.users,
    totalPages: res.data.totalPages,
    page: res.data.page
  };
};

/**
 * Fetch paginated words with optional keyword
 */
export const getWords = async (page = 1, size = 15, keyword = "") => {
  const res = await api.get(`/words?page=${page}&size=${size}&keyword=${keyword}`);
  return res.data;
};

/**
 * Fetch all difficulties 
 */
export const getDifficulties = async () => {
  const res = await api.get(`/difficulties`);
  return res.data;
};

/**
 * Fetch all modes
 */
export const getModes = async () => {
  const res = await api.get(`/modes`);
  return res.data;
};

/**
 * Update an item depending on tab
 */
export const updateItem = async (tab, id, value) => {
  let payload = {};
  switch (tab) {
    case "Word":
      payload.word = value;
      await api.put(`/admin/words/${id}`, payload);
      break;
    case "Difficulty":
      payload.difficulty_label = value;
      await api.put(`/admin/difficulties/${id}`, payload);
      break;
    case "Mode":
      payload.mode_label = value;
      await api.put(`/admin/modes/${id}`, payload);
      break;
    case "User":
      payload.username = value;
      await api.put(`/users/${id}`, payload);
      break;
  }
};

/**
 * Delete an item depending on tab
 */
export const deleteItemById = async (tab, id) => {
  switch (tab) {
    case "Word":
      await api.delete(`/admin/words/${id}`);
      break;
    case "Difficulty":
      await api.delete(`/admin/difficulties/${id}`);
      break;
    case "Mode":
      await api.delete(`/admin/modes/${id}`);
      break;
    case "User":
      await api.delete(`/users/${id}`);
      break;
  }
};

/**
 * Add an item depending on tab
 */
export const addItemByName = async (tab, value) => {
  let payload = {};
  switch (tab) {
    case "Word":
      payload.word = value;
      await api.post(`/admin/words`, payload);
      break;
    case "Difficulty":
      payload.difficulty_label = value;
      await api.post(`/admin/difficulties`, payload);
      break;
    case "Mode":
      payload.mode_label = value;
      await api.post(`/admin/modes`, payload);
      break;
    case "User":
      payload.username = value;
      payload.password = "12345";
      payload.is_admin = 0;
      await api.post(`/users`, payload);
      break;
  }
};
