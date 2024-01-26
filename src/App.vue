<template>
  <NavBar />
  <main>
    <router-view />
  </main>
  <SpeedInsights />
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import { SpeedInsights } from "@vercel/speed-insights/next"
</script>

<style scoped>
  main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 80dvh;
    height: fit-content;
  }
</style>
