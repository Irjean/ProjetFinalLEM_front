<template>
  <header>
    <nav class="navbar navbar-expand navbar-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img alt="Bigscreen logo" class="logo" src="src/assets/bigscreen.svg" width="200" />
        </router-link>
        <div class="collapse navbar-collapse">
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  header{
    background-color: var(--body-color);
    width: 100dvw;
    min-height: 15dvh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>