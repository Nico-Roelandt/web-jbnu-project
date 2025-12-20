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
    <div class="mode-selector">
      <label
        class="mode-button"
        :class="{ selected: selectedMode === 'mode1' }"
      >
        <input
          type="radio"
          name="gameMode"
          value="mode1"
          v-model="selectedMode"
        />
        Mode 1
      </label>

      <label
        class="mode-button"
        :class="{ selected: selectedMode === 'mode2' }"
      >
        <input
          type="radio"
          name="gameMode"
          value="mode2"
          v-model="selectedMode"
        />
        Mode 2
      </label>
    </div>

    <button class="btn primary" @click="playGame">
      Play
    </button>


    <!-- Result -->
    <div v-if="result" class="card result-card">
      <p><strong>Selected mode:</strong> {{ result.mode }}</p>
      <p><strong>Random word:</strong> {{ result.word }}</p>
      <p><strong>Attempts:</strong> {{ result.attempts }}</p>
    </div>
  </div>
</template>

<script setup>
import { playFakeGame } from "@/controllers/gameController.js";

import { ref } from "vue";

const selectedMode = ref("mode1"); // ✅ mode 1 sélectionné par défaut

const playGame = () => {
  console.log("Selected mode:", selectedMode.value);
};

</script>



<script setup>
</script>
