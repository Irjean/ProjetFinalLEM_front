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
  // mounted() {
  //   document.querySelector("header").display=none;
  // }
}


</script>

<style>
  
</style>

<style scoped>
header {
    display: none !important;
  }
.greetings{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
}

p{
  font-size: 1.5rem;
}
</style>