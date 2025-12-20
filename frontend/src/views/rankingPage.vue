<style scoped src="@/assets/css/ranking.css"></style>

<template>
  <div class="page">
    <h2 class="page-title">Ranking</h2>

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
        <RankingBlock title="Victories" :players="victoriesTop3" />
        <RankingBlock title="Average number of attempts" :players="attemptsTop3" />
        <RankingBlock title="Games played" :players="gamesTop3" />
      </div>

      <!-- FULL RANKINGS -->
      <RankingBlock
        v-else-if="activeTab === 'Victories'"
        title="Victories"
        :players="victories"
        :currentUserId="currentUserId"
      />

      <RankingBlock
        v-else-if="activeTab === 'Average number of attempts'"
        title="Average number of attempts"
        :players="attempts"
        :currentUserId="currentUserId"
      />

      <RankingBlock
        v-else-if="activeTab === 'Games played'"
        title="Games played"
        :players="games"
        :currentUserId="currentUserId"
      />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RankingBlock from "@/components/rankingBlock.vue";


const currentUserId = 5;

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