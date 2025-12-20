<template>
  <div class="page center">
    <h2>Welcome to Wordle !</h2>

    <img
      src="@/assets/images/wordle.png"
      alt="Wordle preview"
      class="wordle-image"
    />

    <p>Select a section to continue</p>

    <div class="button-group">
      <RouterLink to="/game" class="btn">Play</RouterLink>
      <RouterLink to="/ranking" class="btn">Rankings</RouterLink>
    </div>
  </div>
</template>

<script setup>
</script>
