<template>
    <div>
      <h1>Page de Sondage</h1>
      <SurveyForm />
      <!-- Autres composants de sondage ici -->
    </div>
</template>
  
<script>
  import SurveyForm from '@/components/SurveyForm.vue';
  import NavBar from '../components/NavBar.vue';
  
  export default {
    components: {
      SurveyForm,
      NavBar
      // Autres composants de sondage à importer ici
    },
    // Logique du composant
  };
</script>
  
<style scoped>
  
</style>