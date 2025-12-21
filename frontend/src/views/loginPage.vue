<template>
  <div class="page auth-page">
    <h2 class="page-title">Authentication</h2>

    <div class="auth-container">
      <!-- LOGIN CARD -->
      <div class="auth-card">
        <h3 class="page-title">Login</h3>

        <form @submit.prevent="handleLogin">
          <div class="field">
            <label>Username</label>
            <input v-model="loginForm.username" placeholder="Enter your username" />
          </div>

          <div class="field">
            <label>Password</label>
            <input
              v-model="loginForm.password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button class="btn primary" type="submit">Login</button>
        </form>

        <button class="btn secondary" style="margin-top: 2rem;" type="button" @click="loginWithGoogle">
          Login with Google
        </button>

        <p v-if="loginError" class="login-message" style="color:red">{{ loginError }}</p>
      </div>

      <!-- REGISTER CARD -->
      <div class="auth-card">
        <h3 class="page-title">Create an account</h3>

        <form @submit.prevent="handleRegister">
          <div class="field">
            <label>Username</label>
            <input v-model="registerForm.username" placeholder="Choose a username" />
          </div>

          <div class="field">
            <label>Password</label>
            <input
              v-model="registerForm.password"
              type="password"
              placeholder="Choose a password"
            />
          </div>

          <button class="btn secondary" type="submit">Create account</button>
        </form>

        <p v-if="registerError" class="login-message" style="color:red">{{ registerError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";
import { login as loginStore } from "@/utils/auth";
import { auth, provider } from "@/utils/firebase";
import { signInWithPopup } from "firebase/auth";

const router = useRouter();

const loginForm = reactive({
  username: "",
  password: ""
});

const registerForm = reactive({
  username: "",
  password: ""
});

const loginError = ref("");
const registerError = ref("");

const handleLogin = async () => {
  loginError.value = "";
  try {
    const res = await api.post("/login", {
      username: loginForm.username,
      password: loginForm.password
    });

    loginStore(res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    window.dispatchEvent(new Event("user-changed"));

    router.push("/user");
  } catch (err) {
    loginError.value = err.response?.data?.message || "Invalid credentials";
  }
};

const handleRegister = async () => {
  registerError.value = "";
  try {
    if (registerForm.password.length < 5) {
      registerError.value = "Password must be at least 5 characters";
      return;
    }

    await api.post("/users", {
      username: registerForm.username,
      password: registerForm.password,
      is_admin: 0
    });

    alert("User created! You can now log in.");
    registerForm.username = "";
    registerForm.password = "";
  } catch (err) {
    registerError.value = err.response?.data?.message || "Registration failed";
  }
};

const loginWithGoogle = async () => {
  loginError.value = "";
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();

    loginStore(token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    const res = await api.post("/users/google-login", {
      googleId: user.uid,
      username: user.displayName
    });

    const userData = res.data.user;
    localStorage.setItem("user", JSON.stringify(userData));

    router.push("/user");
  } catch (err) {
    loginError.value = err.message;
  }
};

</script>

<style scoped src="@/assets/css/login.css"></style>
