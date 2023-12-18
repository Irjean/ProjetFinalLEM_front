<template>
    <div id="admin-container">
        <AdminNavBar />
        <div class="loading-container">
            <Loading v-if="!loaded"/>
        </div>
        <section id="survey-admin" v-if="loaded">
            <h2>Questionnaire</h2>
            <div class="legend">
                <span>type A : Plusieurs choix possible</span>
                <span>type B : Réponse libre</span>
                <span>type C : Réponse entre 1 et 5</span>
            </div>
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
import Loading from '../../components/Loading.vue';
import axios from "axios";
import { ref, onMounted } from "vue";
import { useNavbarStore } from "../../stores/navbar";
import { useQuestionStore } from "../../stores/question";
import { useAdminStore } from "../../stores/admin";
import router from "../../router";

const storeAdmin = useAdminStore();
const storeNavbar = useNavbarStore();
const storeQuestion = useQuestionStore();

let loaded = ref(false);

onMounted(async () => {
    if(!storeAdmin.isAdmin){
        router.push("/administration/login");
    }
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

    .legend{
        display: flex;
        gap: 10px;
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

    .loading-container{
        position: absolute;
        top: 50%;
        left: 60%;
        transform: translate(-50%, -50%);
    }
</style>