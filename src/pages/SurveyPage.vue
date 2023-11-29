<template>
    <div class="container">
      <h1>Page de Sondage</h1>
      
      <form action="http://127.0.0.1/submit_survey" >
        <SurveyQuestion
          v-for="(question,index) in questions"
          :key="index"
          :question="question"
        />
      </form>
      <button @click="submitSurvey">Envoyer</button>
    </div>
</template>
  
<script>
import SurveyQuestion from '../components/survey/SurveyQuestion.vue';
import axios from 'axios';
  
export default {
  components: {
    SurveyQuestion
  },

  data(){
    return {
      loading: true,
      questions: [],
    };
  },

  mounted(){
    this.fetchQuestions();
  },

  methods: {
    fetchQuestions(){
      axios.get('/api/questions')
      .then(response => {
        this.questions = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des questions du sondage', error);
      });
    },

    submitSurvey() {
    // Logique pour traiter les réponses du sondage
    // Peut inclure l'envoi des réponses à l'API lorsque celle-ci sera prête
    // Redirection vers la page des résultats, etc.
    },

  },
};
</script>
  
<style scoped>
  form {
    width: 50%;
  }

  .container {
    align-items : center;
    display: flex;
    flex-direction: column;
  }
</style>