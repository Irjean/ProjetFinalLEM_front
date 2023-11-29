<template>
  <NavBar />
  <main>
    <router-view />
  </main>  

</template>

<script setup>
import NavBar from './components/NavBar.vue';
  
</script>

<style scoped>
  main{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 1rem;
  }
</style>
