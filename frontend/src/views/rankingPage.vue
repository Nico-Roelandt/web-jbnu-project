<style scoped src="@/assets/css/ranking.css"></style>

<template>
  <div class="page">
    <h2 class="page-title">Rankings</h2>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['tab-button', { active: activeTab === tab }]"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div v-if="isLoading" class="loading-container">
      <p class="loading-text">Loading rankings...</p>
    </div>

    <div v-else>
      <!-- TOP 3 -->
      <div v-if="activeTab === 'Top 3'">
        <RankingBlock title="Victories" :players="victoriesTop3" :currentUserId="currentUserIdForHighlight" />
        <RankingBlock title="Average number of attempts" :players="attemptsTop3" :currentUserId="currentUserIdForHighlight" />
        <RankingBlock title="Games played" :players="gamesTop3" :currentUserId="currentUserIdForHighlight" />
      </div>

      <!-- FULL RANKINGS -->
      <RankingBlock
        v-else-if="activeTab === 'Victories'"
        title="Victories"
        :players="victories"
        :currentUserId="currentUserIdForHighlight"
      />

      <RankingBlock
        v-else-if="activeTab === 'Average number of attempts'"
        title="Average number of attempts"
        :players="attempts"
        :currentUserId="currentUserIdForHighlight"
      />

      <RankingBlock
        v-else-if="activeTab === 'Games played'"
        title="Games played"
        :players="games"
        :currentUserId="currentUserIdForHighlight"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import RankingBlock from "@/components/rankingBlock.vue";
import {
  getVictoriesRanking,
  getVictoriesTop3,
  getAttemptsRanking,
  getAttemptsTop3,
  getGamesRanking,
  getGamesTop3
} from "@/controllers/rankingController";

const tabs = [
  "Top 3",
  "Victories",
  "Average number of attempts",
  "Games played"
];

const activeTab = ref("Top 3");
const isLoading = ref(true);

const victories = ref([]);
const attempts = ref([]);
const games = ref([]);

const victoriesTop3 = ref([]);
const attemptsTop3 = ref([]);
const gamesTop3 = ref([]);

const currentUserIdForHighlight = computed(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  return token && user?.id ? user.id : null;
});

onMounted(async () => {
  try {
    victories.value = await getVictoriesRanking();
    attempts.value = await getAttemptsRanking();
    games.value = await getGamesRanking();

    victoriesTop3.value = await getVictoriesTop3();
    attemptsTop3.value = await getAttemptsTop3();
    gamesTop3.value = await getGamesTop3();
  } catch (error) {
    console.error("Failed to load rankings:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
