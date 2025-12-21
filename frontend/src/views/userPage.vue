<style scoped src="@/assets/css/user.css"></style>

<template>
  <div class="page">
    <h2 class="page-title">User Profile</h2>

    <div v-if="user" class="profile-container">
      <div class="profile-card">
        <div class="profile-header">
          <img
            src="@/assets/images/profile-placeholder.png"
            alt="Profile picture"
            class="profile-avatar"
          />

          <div class="profile-identity">
            <h2>{{ user.username }}</h2>
          </div>
        </div>

        <div class="profile-section">
          <h3>Game Stats</h3>

          <div class="stats-grid">
            <div class="stat-box">
              <span class="stat-value">{{ user.nb_games }}</span>
              <span class="stat-label">Games Played</span>
            </div>

            <div class="stat-box">
              <span class="stat-value">{{ user.avg_attempts }}</span>
              <span class="stat-label">Average Attempts</span>
            </div>

            <div class="stat-box">
              <span class="stat-value">{{ user.nb_victories }}</span>
              <span class="stat-label">Victories</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h3>Rankings</h3>

          <ul class="ranking-list" v-if="rankings">
            <li>
              <span>Victories</span>
              <strong>#{{ rankings.victories }}</strong>
            </li>
            <li>
              <span>Attempts</span>
              <strong>#{{ rankings.attempts }}</strong>
            </li>
            <li>
              <span>Games Played</span>
              <strong>#{{ rankings.games }}</strong>
            </li>
          </ul>

          <div v-else class="loading-container">
            <p class="loading-text">Loading rankings...</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-container">
      <p class="loading-text">Loading profile...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUserById, getUserRankings } from "@/controllers/userController";

const user = ref(null); 
const rankings = ref(null); 

onMounted(async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id;

    if (!userId) throw new Error("User not logged in");

    user.value = await getUserById(userId);
    rankings.value = await getUserRankings(userId);

  } catch (err) {
    console.error("Failed to load user profile", err);
  }
});
</script>
