<template>
    <div id="admin-container">
        <AdminNavBar />
        <section id="survey-admin" v-if="loaded">
            <h2>Questionnaire</h2>
            <table>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Question</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody v-for="question in storeQuestion.questions">
                    <tr>
                        <td>{{ question.id }}</td>
                        <td>{{ question.content }}</td>
                        <td>{{ question.type }}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script setup>
import AdminNavBar from '../../components/AdminNavBar.vue';
import axios from "axios";
import { ref, onMounted } from "vue";
import { useNavbarStore } from "../../stores/navbar";
import { useQuestionStore } from "../../stores/question";

const storeNavbar = useNavbarStore();
const storeQuestion = useQuestionStore();

let loaded = ref(false);

onMounted(async () => {
    storeNavbar.hideNavbar();
    if(!storeQuestion.isFetched){
        await axios("/api/questions")
        .then(res => {
            storeQuestion.questions = res.data;
            storeQuestion.isFetched = true;
            loaded.value = true;
        });
        return
    }
    loaded.value = true;
})


</script>
<style scoped>
    #survey-admin{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 85dvw;
        height: 100%;
        gap: 20px;
    }
    table{
        width: 80%;
    }

    table th, table td{
        border: 1px solid black;
        padding-left: 5px;
    }

    table th{
        font-weight: 700;
    }
</style>