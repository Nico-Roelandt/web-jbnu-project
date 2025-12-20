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
            <input v-model="login.username" placeholder="Username" />
          </div>

          <div class="field">
            <label>Password</label>
            <input
              v-model="login.password"
              type="password"
              placeholder="Password"
            />
          </div>

          <button class="btn primary">Login</button>
        </form>
      </div>

      <!-- REGISTER CARD -->
      <div class="auth-card">
        <h3 class="page-title">Sign up</h3>

        <form @submit.prevent="handleRegister">
          <div class="field">
            <label>Username</label>
            <input v-model="register.username" placeholder="Username" />
          </div>

          <div class="field">
            <label>Password</label>
            <input
              v-model="register.password"
              type="password"
              placeholder="Password"
            />
          </div>

          <button class="btn secondary">Create account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const login = reactive({ username: "", password: "" });
const register = reactive({ username: "", password: "" });

const handleLogin = () => {
  console.log("LOGIN", login);
};

const handleRegister = () => {
  console.log("REGISTER", register);
};
</script>

<style scoped src="@/assets/css/login.css"></style>
