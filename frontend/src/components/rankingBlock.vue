<style scoped src="@/assets/css/ranking.css"></style>

<template>
  <div class="ranking-block">
    <h3>{{ title }}</h3>

    <ul>
      <li
        v-for="(player, index) in players"
        :key="player.id"
        :class="[
          'ranking-row',
          { 'current-user': player.id === currentUserId }
        ]"
      >
        <span class="rank">
          <span v-if="index === 0">🥇</span>
          <span v-else-if="index === 1">🥈</span>
          <span v-else-if="index === 2">🥉</span>
          <span v-else>{{ index + 1 }}</span>
        </span>

        <span class="username">{{ player.username }}</span>
        <span class="value">{{ getValue(player) }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  players: {
    type: Array,
    default: () => []
  },
  currentUserId: {
    type: Number,
    default: null
  }
});

const getValue = (player) => {
  if (player.nb_victories !== undefined) return player.nb_victories;
  if (player.avg_attempts !== undefined) return player.avg_attempts.toFixed(2);
  if (player.nb_games !== undefined) return player.nb_games;
  return "-";
};
</script>
