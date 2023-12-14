<template>
  <header id="main-header" v-if="store.isNavbarVisible">
    <nav class="navbar navbar-expand navbar-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img alt="Bigscreen logo" class="logo" src="public/bigscreen.svg" />
        </router-link>
        <div class="collapse navbar-collapse">
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useNavbarStore } from '../stores/navbar';

const store = useNavbarStore();

</script>

<style>
/* Navbar principal */
  #main-header{
    background-color: var(--body-color);
    width: 100dvw;
    min-height: 15dvh;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  #main-header nav a {
    display: flex;
    justify-content: center;
  }
  #main-header nav img {
    width: 90%;
  }

 /* Desktop */
@media (min-width: 1024px) {
 nav img {
  width: 90%;
 }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  nav img {
    width: 80%;
  }
}

/* Mobile */
@media (max-width: 767px) {
  nav img {
    width: 70%;
  }
}
</style>