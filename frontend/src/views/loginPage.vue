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

          <button class="btn primary">Login</button>
        </form>
        <p v-if="errorMessage" class="login-message" style="color:red">{{ errorMessage }}</p>
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

          <button class="btn secondary">Create account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@/services/api";
import { useRouter } from "vue-router";
import { login as loginStore } from "@/utils/auth";

const router = useRouter();

const loginForm = reactive({
  username: "",
  password: ""
});

const registerForm = reactive({
  username: "",
  password: ""
});

const errorMessage = ref("");

const handleLogin = async () => {
  try {
    const res = await api.post("/login", {
      username: loginForm.username,
      password: loginForm.password
    });

    loginStore(res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    router.push("/user"); 
  } catch (err) {
    errorMessage.value = err.response?.data?.message || "Invalid credentials";
  }
};

const handleRegister = async () => {
  try {
    const res = await api.post("/users", {
      username: registerForm.username,
      password: registerForm.password,
      is_admin: 0
    });
    alert("User created! You can now log in.");
    registerForm.username = "";
    registerForm.password = "";
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};
</script>


<style scoped src="@/assets/css/login.css"></style>
