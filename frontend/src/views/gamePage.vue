<template>
  <div class="page">
    <h2>Word Game</h2>

    <button @click="startGame">Start game</button>

    <div v-if="length" style="margin-top:12px">
      <p>Word length: {{ length }}</p>

      <input v-model="guess" :maxlength="length" placeholder="Enter word" />
      <button @click="tryWord">Test word</button>

      <div v-if="result.length" style="display:flex; gap:8px; margin-top:12px">
        <div v-for="(r, i) in result" :key="i" class="cell" :class="r">
          {{ (guess[i] || '').toUpperCase() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const gameId = ref(null)
const length = ref(0)
const guess = ref("")
const result = ref([])

const startGame = async () => {
  const r = await fetch("http://localhost:3000/games/start")
  const d = await r.json()
  gameId.value = d.game_id
  length.value = d.length
  guess.value = ""
  result.value = []
  alert("Game id: " + gameId.value + " | length: " + length.value)
}

const tryWord = async () => {
  if (!gameId.value) {
    alert("No game id, click Start game")
    return
  }
  if (guess.value.length !== length.value) {
    alert("Wrong length")
    return
  }

  const url = `http://localhost:3000/games/${gameId.value}/guess`
  console.log("POST", url)

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ guess: guess.value.toLowerCase() })
  })

  const d = await r.json()

  if (!r.ok) {
    alert("Error: " + JSON.stringify(d))
    return
  }

  result.value = d.result || []

  if (d.inDb === false) alert("Not in DB (letters still checked)")
  if (d.win) alert("You won 🎉")
}
</script>

<style scoped>
.cell {
  width: 40px;
  height: 40px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}
.correct { background: #2e7d32; }
.present { background: #f9a825; }
.absent  { background: #616161; }
</style>
