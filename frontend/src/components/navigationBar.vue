<template>
  <nav class="navbar">
    <RouterLink to="/"><h1 class="logo">Wordle</h1></RouterLink>
    <div class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/game">Game</RouterLink>
      <RouterLink to="/ranking">Rankings</RouterLink>
      <RouterLink v-if="!isLoggedIn" to="/login">Login</RouterLink>
      <RouterLink v-if="isLoggedIn && user?.is_admin" to="/admin">Admin</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/user">Profile</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/" @click.prevent="handleLogout">Logout</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { userToken, logout } from "@/utils/auth";

const router = useRouter();
const isLoggedIn = computed(() => !!userToken.value);

const user = ref(JSON.parse(localStorage.getItem("user") || "null"));

window.addEventListener("user-changed", () => {
  user.value = JSON.parse(localStorage.getItem("user") || "null");
});

function handleLogout() {
  logout();
  user.value = null;
  router.push("/login");
}
</script>

