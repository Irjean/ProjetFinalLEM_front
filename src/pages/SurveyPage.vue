<template>
    <div class="container">
      <h1>Page de Sondage</h1>
      
      <form action="http://127.0.0.1/submit_survey" class="form-survey" v-if="!loading">
        <SurveyQuestion
          v-for="(question,index) in questions"
          :key="index"
          :index="index"
          :question="question"
          :questionCount="questionCount"
          @answerChanged="validateQuestion(index)"
        />
      </form>
      
      <button @click="submitSurvey" class="button-large"><img src="src/assets/picto/send.png">Envoyer</button>

      <div v-if="showOverlay" class="overlay" @click="closeOverlay">
        <div v-if="showMessage" class="popup show">
          <a @click="closeMessage" class="close" href="#popup1">×</a>

          <p>Toute l’équipe de Bigscreen vous remercie pour votre engagement. Grâce à votre investissement, nous vous préparons une application toujours plus facile à utiliser, seul ou en famille. 
          <br>
          Si vous désirez consulter vos réponse ultérieurement, vous pouvez consultez cette adresse: 
          <br>
          URL getResponses
          </p>
        </div>
      </div>
      
      
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
      questionCount: 0,
      showMessage: false,
      showOverlay: false,
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
        this.questionCount = this.questions.length;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des questions du sondage', error);
      });
    },

    submitSurvey() {
      // Logique pour traiter les réponses du sondage (axios...)

      // Afficher la overlay
      this.showOverlay = true;

      // Afficher le popup
      this.showMessage = true;
    },
    closeOverlay() {
      // Fermer la div overlay
      this.showOverlay = false;
      this.showMessage = false;
    },
    closeMessage() {
      this.showOverlay = false;
      this.showMessage = false; 
    },
  },
};
</script>
  
<style scoped>
  
h1{
    font-size: 2.3rem;
    font-weight: 700;
  }

  form {
    width: 50%;
  }

  .container {
    align-items : center;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-bottom: 4rem;
  }

  /* .form-survey {
    gap: 3rem;
  } */

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
  .popup.show {
    opacity: 1;
  }
  .popup .close { 
    position: relative; 
    transition: all 200ms;
    font-size: 4rem; 
    font-weight: 700; 
    text-decoration: none; 
    color: #333; }
  .popup .close:hover { color: var(--primary-dark-color); }
  .popup .content     { max-height: 30%; overflow: auto; }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999; 
  }
  
</style>