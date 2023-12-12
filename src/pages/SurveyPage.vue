<template>
    <div class="container">
      <h1>Page de Sondage</h1>
      <p>Merci de répondre à toutes les questions et de valider le formulaire en bas de page.</p>
      
      <form action="http://127.0.0.1/submit_survey" id="survey-form" class="form-survey" v-if="!loading">
        <div v-for="(question,index) in questions">
          <SurveyQuestion
            :key="index"
            :index="index"
            :question="question"
            :questionCount="questionCount"
            @question-answered="handleQuestionAnswered"
          />
        </div>
      </form>

      <button @click.prevent="submitSurvey" 
        :disabled="allQuestionsAnswered" 
        id="survey-btn" 
        class="button-large" 
        :class=" {'btn-disabled': !allQuestionsAnswered}" 
        type="submit">
        <img src="/picto/send.png" alt="logo">
        Envoyer
      </button>
      
      

      <div v-if="showOverlay" class="overlay" @click="closeOverlay">
        <div v-if="showMessage" class="popup show">
          <a @click="closeMessage" class="close" href="#popup1"><i class="bi bi-x-lg"></i></a>

          <p>Toute l’équipe de Bigscreen vous remercie pour votre engagement. Grâce à votre investissement, nous vous préparons une application toujours plus facile à utiliser, seul ou en famille. 
          <br>
          Si vous désirez consulter vos réponse ultérieurement, vous pouvez consultez cette adresse: 
          <br>
          URL postResponses
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
      allQuestionsAnswered: false,
      answers: [],
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
        window.console.log(this.questions);
        this.loading = false;
        this.questionCount = this.questions.length;
        
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des questions du sondage', error);
      });
    },

    handleQuestionAnswered(answer) {
      if(answer.error) {
        this.answers[answer.number-1] = false;
      } else {
        this.answers[answer.number-1] = answer;
      }

      let answerErrors = this.answers.filter(answer => answer === false);
      this.allQuestionsAnswered = answerErrors.length === 0 && Object.keys(this.answers).length === this.questionCount
    },

    submitSurvey() {
      // Logique pour traiter les réponses du sondage (axios...)
      // const form = document.getElementById("survey-form");
      // const formBtn = document.getElementById("survey-btn");
      // const formData = new FormData(form, formBtn);

      // for(const [key, value] of formData){
      //   console.log(key + " " + value)
      // }


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
    font-size: 2.2rem;
    font-weight: 700;
  }

  .form-survey {
    width: 50%;
  }

  .container {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding-bottom: 4rem;
  }

  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 1.25rem 1.25rem 3.5rem 1.25rem;
    border: 1px solid var(--gray-300-color);
    box-shadow: 0 2px 10px var(--shadow-bg-color);
    z-index: 1000;

    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
  .popup.show {
    opacity: 1;
    color: black;
  }
  .close{ 
    position: relative; 
    left: 40rem;
    font-size: 2rem;
    font-weight: 800;
    transition: all 200ms;
    color: var(--body-color);
    -webkit-text-stroke: 0.3rem;
  }
  i:hover {
    color: var(--primary-dark-color); 
  }

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

  .btn-disabled {
    background-color: var(--gray-color);
  }
  

  /* Desktop */
  @media (min-width: 1024px) {
    h1{
    font-size: 2.2rem;
    }

    .container p {
      margin: 0rem 3rem 0rem 3rem;
    }

    .form-survey {
      width: 50%;
    }
  }

  /* Tablet */
  @media (min-width: 768px) and (max-width: 1023px) {
    h1{
    font-size: 2rem;
    }

    .container {
    gap: 2.5rem;
    padding-bottom: 4rem;
  }
    .container p {
      margin: 0rem 3rem 0rem 3rem;
    }

    .form-survey {
      width: 60%;
    }
  }

  /* Mobile */
  @media (min-width: 460px) and (max-width: 767px) {
    h1{
    font-size: 1.9rem
    }

    .container {
    flex-direction: column;
    gap: 2.5rem;
    padding-bottom: 4rem;
  }
    .container p {
      margin: 0rem 3rem 0rem 3rem;
    }
  
    .form-survey {
      width: 80%;
    }
  }

  @media (max-width: 460px) {
    h1{
    font-size: 1.8rem;
    }

    .container {
    gap: 2rem;
  }
    .container p {
      margin: 0rem 2rem 0rem 2rem;
    }

    .form-survey {
      width: 80%;
    }
  }
</style>