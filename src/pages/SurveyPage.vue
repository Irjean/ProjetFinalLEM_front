<template>
    <div>
      <h1>Page de Sondage</h1>
      
      <component
        v-for="(question,index) in questions"
        :key="index"
        :is="getQuestionComponent(question.type)"
        :question="question"
      />
      <button @click="submitSurvey">Envoyer</button>
    </div>
</template>
  
<script>
import MultipleChoiceQuestion from '@/components/survey/MultipleChoiceQuestion.vue';
import TextQuestion from '@/components/survey/TextQuestion.vue';
import NumericQuestion from '@/components/survey/NumericQuestion.vue';
import axios from 'axios';

  
  export default {
    components: {
      MultipleChoiceQuestion,
      TextQuestion,
      NumericQuestion,
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
          this.questoins = response.data.questions;
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

      getQuestionComponent(type) {
        // Retourne le composant approprié en fonction du type de question
        switch (type) {
          case 'A':
            return 'MultipleChoiceQuestion';
          case 'B':
            return 'TextQuestion';
          case 'C':
            return 'NumericQuestion';
        }
      },
    },
  };
</script>
  
<style scoped>
  
</style>