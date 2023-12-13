<template>
    <div class="response-page-">
        <h1>Réponses du Sondage</h1>
        <div>
            <ResponseItem
                v-for="(response, index) in responses"
                :key="index"
                :question="response.question"
                :answer="response.answer"
            />
        </div>
    </div>

    
</template>

<script>
import axios from 'axios';
import ResponseItem from '../components/survey/ResponseItem.vue';

export default {
    components: {
        ResponseItem,
    },
    data() {
        return {
            responses: [],
        };
    },
    mounted() {
        this.fetchReponses();
    },
    methods: {
        async fetchReponses() {
            try {
                const response = await axios.post('/api/submit_survey');
                this.responses = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des réponses', error);
            }
        }
    },
}
</script>