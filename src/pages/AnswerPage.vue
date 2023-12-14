<template>
    <div class="container">
        <h1>Réponses du Sondage</h1>
        <div>
            <SurveyAnswer
                v-for="(answer, index) in answers"
                :key="index"
                :question="answer.question"
                :answer="answer.answer"
            />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SurveyAnswer from '../components/survey/SurveyAnswer.vue';

export default {
    components: {
        SurveyAnswer,
    },
    data() {
        return {
            answers: [],
        };
    },
    mounted() {
        this.fetchAnswers();
    },
    methods: {
        async fetchAnswers() {
            try {
                const profileId = this.$route.params.id;
                const answersResponse = await axios.get(`/api/answer/${profileId}`);
                this.answers = answersResponse.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des réponses', error);
            }
        }
    },
}
</script>