<template>
    <div id="admin-container">
        <AdminNavBar />
        <div class="loading-container">
            <Loading v-if="!loaded"/>
        </div>
        <section id="answer-admin" v-if="loaded">
            <h2>Réponses du questionnaire</h2>
            <div class="tables-container">
                <table v-for="item in sortedAnswers">
                    <thead>
                        <tr>
                            <th class="table-one">N°</th>
                            <th class="table-two">Question</th>
                            <th class="table-three">Réponses</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="answer in item">
                            <td class="table-one">{{ answer.question_id }}</td>
                            <td class="table-two">{{ storeQuestion.questions.find(i => i.id == answer.question_id).content }}</td>
                            <td class="table-three">{{ answer.content }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<script setup>
import AdminNavBar from '../../components/AdminNavBar.vue';
import Loading from '../../components/Loading.vue';
import axios from "axios";
import { ref, onMounted } from "vue";
import { useNavbarStore } from "../../stores/navbar";
import { useAnswerStore } from '../../stores/answer';
import { useQuestionStore } from '../../stores/question';
import { useAdminStore } from "../../stores/admin";
import router from '../../router';

const storeAdmin = useAdminStore();
const storeNavbar = useNavbarStore();
const storeAnswer = useAnswerStore();
const storeQuestion = useQuestionStore();

let loaded = ref(false);
let sortedAnswers = ref([]);

onMounted(async () => {
    if(!storeAdmin.isAdmin){
        router.push("/administration/login");
    }
    storeNavbar.hideNavbar();
    if(!storeQuestion.isFetched){
        await getQuestions();
    }
    if(!storeAnswer.isFetched){
        await getAnswers();
    }
    sortedAnswers.value = await sortAnswers(storeAnswer.answers);
    loaded.value = true;
});

async function getQuestions(){
    await axios("/api/questions")
    .then(res => {
        storeQuestion.questions = res.data;
        storeQuestion.isFetched = true;
    });
}

async function getAnswers(){
    await axios("/api/answer/all")
    .then(res => {
        storeAnswer.answers = res.data;
        storeAnswer.isFetched = true;
    });
}

function sortAnswers(arr){
    let result = [];
    let groupArray;
    arr.sort((a, b) => a.profile_id - b);
    for (let i = 0; i < arr.length; i++) {
        if(arr[i - 1]?.profile_id !== arr[i].profile_id){
            groupArray = [];
            result.push(groupArray);
        };
        groupArray.push(arr[i]);
    };
    return result;
}

</script>
<style scoped>
    #answer-admin{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:  85dvw;
        height: 80dvh;
        margin-top: 10dvh;
    }

    #answer-admin h2{
        margin-bottom: 30px;
    }

    .tables-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        gap: 50px;
        overflow-y: scroll;
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

    .table-one{
        width: 3%;
    }

    .table-two{
        width: 65%;
    }

    .table-three{
        width: 32%;
    }

    .loading-container{
        position: absolute;
        top: 50%;
        left: 60%;
        transform: translate(-50%, -50%);
    }

    @media screen and (max-width: 730px) {
        #answer-admin{
            width: 70dvw;
        }
    }
</style>