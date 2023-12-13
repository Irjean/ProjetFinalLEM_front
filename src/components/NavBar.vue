<template>
  <header>
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

<style>
  header{
    background-color: var(--body-color);
    width: 100dvw;
    min-height: 15dvh;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  nav a {
    display: flex;
    justify-content: center;
  }
  nav img {
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