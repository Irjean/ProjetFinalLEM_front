<template>
    <div class="container">
      <h1>Page de Sondage</h1>
      <p>Merci de répondre à toutes les questions et de valider le formulaire en bas de page.</p>
      
      <Loading v-if="loaded == false"/>
      <form action="http://127.0.0.1/submit_survey" id="survey-form" class="form-survey">
        <div v-for="(question,index) in storeQuestion.questions" :key="index">
          <SurveyQuestion
            :index="index"
            :question="question"
            :questionCount="storeQuestion.questions.length"
          />
        </div>
        <div class="btn-container">
         <button @click.prevent="submitSurvey" 
           :disabled="!storeAnswer.allAnswered" 
           id="survey-btn" 
           class="button-large" 
           :class="!storeAnswer.allAnswered ? 'btn-disabled' : ''" 
           type="submit">
           <img src="/picto/send.png" alt="logo">
           Envoyer
          </button>
          <Loading v-if="sendingAnswer"/>
          <span class="error-msg" v-if="error.isError">{{ error.message }}</span>
        </div>
      </form>

      <div v-if="showOverlay" class="overlay">
        <div class="popup show">
          <a @click="closeMessage" class="close" href="#popup1"><i class="bi bi-x-lg"></i></a>

          <p>Toute l'équipe de Bigscreen vous remercie pour votre engagement. Grâce à votre investissement, nous vous préparons une application toujours plus facile à utiliser, seul ou en famille. 
          <br>
          Si vous désirez consulter vos réponses ultérieurement, vous pouvez suivre ce lien :
          <br>
          <router-link :to="profileLink">http://localhost:5173{{profileLink}}</router-link>
          </p>
        </div>
      </div>
      
      
    </div>
</template>

<script setup>
import SurveyQuestion from '../components/survey/SurveyQuestion.vue';
import axios from 'axios';
import { ref, onMounted, watch } from "vue";
import { useNavbarStore } from "../stores/navbar";
import { useAnswerStore } from "../stores/answer";
import { useQuestionStore } from '../stores/question';
import Loading from "../components/Loading.vue";

let loaded = ref(true);
let sendingAnswer = ref(false);
let showOverlay = ref(false);
let allQuestionsAnswered = ref(false);
let profileLink = ref("");
let error = ref({
  message: "",
  isError: false
})

const storeNavbar = useNavbarStore();
const storeQuestion = useQuestionStore();
const storeAnswer = useAnswerStore();

onMounted(() => {
  storeNavbar.showNavbar();
  storeAnswer.formAnswers = [];
  axios.get("sanctum/csrf-cookie");
  if(!storeQuestion.isFetched){
    loaded.value = false;
    fetchQuestions();
  }
  
});

function fetchQuestions(){
  axios.get('/api/questions')
  .then(response => {
    loaded.value = true;
    storeQuestion.questions = response.data;
    storeQuestion.isFetched = true;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des questions du sondage', error);
  });
}

watch(storeAnswer.formAnswers, (newValue) => {
  console.log(newValue);
});

function submitSurvey() {
  // Logique pour traiter les réponses du sondage (axios...)
  sendingAnswer.value = true;
  error.value.isError = false;
  const arr = storeAnswer.formAnswers.filter(n => n);
  axios.post("/api/answer", {
    answers: arr
  })
  .then(res => {
    sendingAnswer.value = false;
    profileLink.value = "/reponse/" + res.data.profile.uid;
    showOverlay.value = true;
  })
  .catch(msg => {
    sendingAnswer.value = false;
    showOverlay.value = false;
    error.value.isError = true;
    error.value.message = msg.response.data.message;
    console.error(msg.response.data.message);
  });
}

function closeMessage() {
  showOverlay.value = false;
}

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
    padding: 50px 0
  }

  form{
    padding-bottom: 50px;
  }

  #survey-btn{
    background-color: #00bd7e; 
  }

  #survey-btn:hover{
        background-color: #02a871;
    }

    #survey-btn:active{
        background-color: #028559;
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

  .btn-container{
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 50px;
  }

  .btn-disabled {
    background-color: var(--gray-color) !important;
  }

  .error-msg{
    color: red;
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