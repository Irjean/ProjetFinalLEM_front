<template>

  <div class="greetings">
    <h3>
      Bigscreen est une entreprise qui développe une application VR permettant aux utilisateurs de regarder en VR des films, émissions TV et jeux vidéos sur un écran géant virtuel, seul ou à plusieur.
      <br>
      <a href="https://bigscreenvr.com/" target="_blank" rel="noopener">Visiter Bigscreen</a>
      <br>
      Afin de préparer la prochaine itération de leur application, nous désiront récolter des informations de la part de nos utilisateurs via un sondage en ligne.
      <br>
      <router-link to="/survey">Accéder au sondage</router-link>
    </h3>
  </div>

</template>


<script>
import NavBar from '../components/NavBar.vue';

export default {
  name: "HomePage",
  components: {
    NavBar
  }
}

</script>


<style scoped>

/* h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
