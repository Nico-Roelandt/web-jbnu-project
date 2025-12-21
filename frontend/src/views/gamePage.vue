<style scoped src="@/assets/css/game.css"></style>

<template>
  <div class="page center">
    <h2>Game</h2>

    <p class="info-text">
      Since the main subject of this project is not the game itself,
      the Wordle gameplay is not implemented.
    </p>

    <!-- Wordle image -->
    <img
      src="@/assets/images/wordle.png"
      alt="Wordle preview"
      class="wordle-image"
    />

    <!-- Mode selection -->
    <div class="mode-selector" v-if="modes.length">
      <label
        v-for="mode in modes"
        :key="mode.id"
        class="mode-button"
        :class="{ selected: selectedMode === mode.id }"
      >
        <input
          type="radio"
          name="gameMode"
          :value="mode.id"
          v-model="selectedMode"
        />
        {{ mode.mode_label }}
      </label>
    </div>

    <button class="btn primary" @click="playGame">
      Play
    </button>

    <!-- Result -->
    <div v-if="result" class="card result-card" style="margin-top: 2rem;">
      <p><strong>Selected mode:</strong> {{ result.modeLabel }}</p>
      <p><strong>Random word:</strong> {{ result.word }}</p>
      <p><strong>Attempts:</strong> {{ result.attempts }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getModes } from "@/controllers/adminController.js"; 
import { playFakeGame } from "@/controllers/gameController.js";

const modes = ref([]);
const selectedMode = ref(null);
const result = ref(null);

const fetchModes = async () => {
  try {
    const res = await getModes();
    modes.value = res;

    if (res.length > 0) {
      selectedMode.value = res[0].id;
    }
  } catch (err) {
    console.error("Failed to fetch modes:", err);
  }
};

onMounted(fetchModes);

const playGame = async () => {
  if (!selectedMode.value) return;

  const modeObj = modes.value.find(m => m.id === selectedMode.value);

  const fakeResult = await playFakeGame(selectedMode.value);

  result.value = {
    ...fakeResult,
    modeLabel: modeObj.mode_label
  };
};
</script>
