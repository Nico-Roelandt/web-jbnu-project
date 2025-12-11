<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

  <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/admin">Admin</RouterLink> |
      <RouterLink to="/game">Game</RouterLink> |
      <RouterLink to="/ranking">Ranking</RouterLink> |
      <RouterLink to="/user">User</RouterLink> 
    </nav>
      
  </header>

  <RouterView />
</template>
