<template>
    <div class="loading-container">
        <Loading v-if="!loaded"/>
    </div>
    <div class="container" v-if="loaded">
        <h1>Vous trouverez ci-dessous les réponses que vous avez apporté à notre sondage.</h1>
        <div>
            <SurveyAnswer 
            v-for="(question, index) in storeQuestion.questions"
            :index="index"
            :question="question"
            :answer="profileAnswer.find(i => i.question_id == question.id)"
            :questionCount="storeQuestion.questions.length"
            />
        </div>
   </div>
</template>

<script setup>
import axios from 'axios';
import SurveyAnswer from '../components/survey/SurveyAnswer.vue';
import Loading from '../components/Loading.vue';
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useQuestionStore } from "../stores/question";

const route = useRoute();
const storeQuestion = useQuestionStore();

let loaded = ref(false);
let profileAnswer = ref([]);

onMounted(async () => {
    if(!storeQuestion.isFetched){
        await fetchQuestions();
        storeQuestion.isFetched = true;
    }
    await fetchAnswers();
    loaded.value = true;
})

async function fetchAnswers() {
    try {
        await axios.get(`/api/answers/${route.params.id}`)
        .then(res => profileAnswer = res.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des réponses', error);
    }
}

async function fetchQuestions() {
    try {
        await axios.get(`/api/questions`)
        .then(res => storeQuestion.questions = res.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des réponses', error);
    }
}
</script>

<style scoped>
    .container{
        margin-top: 30px;
        width: 50%;
    }

    .loading-container{
        margin-top: 50px;
    }
</style>