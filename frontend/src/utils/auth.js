import { ref } from "vue";

const userToken = ref(localStorage.getItem("token") || null);

export function getToken() {
  return userToken.value;
}

export function login(token) {
  localStorage.setItem("token", token);
  userToken.value = token;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  userToken.value = null;
}

export { userToken };
