<template>

  <div class="greetings">
    <p>
      Bigscreen est une entreprise qui développe une application VR permettant aux utilisateurs de regarder en VR des films, émissions TV et jeux vidéos sur un écran géant virtuel, seul ou à plusieur.
      <br>
      <a href="https://bigscreenvr.com/" target="_blank" rel="noopener">Visiter Bigscreen</a>
      <br>
      Afin de préparer la prochaine itération de leur application, nous désiront récolter des informations de la part de nos utilisateurs via un sondage en ligne.
      <br>
      <router-link to="/survey">Accéder au sondage</router-link>
    </p>
  </div>

</template>


<script>
import NavBar from '../components/NavBar.vue';

export default {
  name: "HomePage",
  components: {
    NavBar
  },
}
</script>

<style scoped>
header {
    display: none !important;
  }
.greetings{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 2rem;
}

p{
  font-size: 1.2rem;
  font-weight: 500;
}

/* HD */ 
@media (min-width: 1440px) {
  .greetings p {
    font-size: 1.2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) and (max-width: 1439px){
  .greetings p {
    font-size: 1.1rem;
  }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  .greetings {
    width: 60%;
    padding: 3rem;
  }
  .greetings p {
    font-size: 1rem;
  }
}

/* Mobile */
@media (min-width: 460px) and (max-width: 767px) {
  .greetings {
    width: 70%;
  }
  .greetings p {
    font-size: 1rem;
  }
}
@media (max-width: 460px) {
  .greetings {
    width: 80%;
  }
  .greetings p {
    font-size: 0.8rem;
  }
}
</style>