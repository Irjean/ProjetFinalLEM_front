<template>
    <div id="admin-container">
        <AdminNavBar />
        <div class="loading-container">
            <Loading v-if="!loaded"/>
        </div>
        <section id="home-admin" v-if="loaded">
            <div class="chart-container">
                <h2>Matériel VR utilisé</h2>
                <div>
                    <Pie :data="dataQuestion6" :options="chartOptions" />
                </div>
            </div>
            <div class="chart-container">
                <h2>Platforme d'achat en ligne</h2>
                <div>
                    <Pie :data="dataQuestion7" :options="chartOptions" />
                </div>
            </div>
            <div class="chart-container">
                <h2>Raison d'utilisation</h2>
                <div>
                    <Pie :data="dataQuestion10" :options="chartOptions" />
                </div>
            </div>
            <div class="chart-container">
                <h2>Score de qualité</h2>
                <Radar :data="radarChart" :options="radarOptions" />
            </div>
        </section>
    </div>
</template>

<script setup>
import AdminNavBar from "../../components/AdminNavBar.vue";
import Loading from "../../components/Loading.vue";
import { onMounted, ref } from "vue";
import { useAdminStore } from "../../stores/admin";
import { useNavbarStore } from "../../stores/navbar";
import { useQuestionStore } from "../../stores/question";
import { useAnswerStore } from "../../stores/answer";
import { Chart as ChartJS, Title, CategoryScale, ArcElement, Tooltip, Legend, Filler, LineElement, PointElement, RadialLinearScale } from 'chart.js';
import { Pie, Radar } from 'vue-chartjs';
import axios from "axios";
import router from "../../router";

const storeAdmin = useAdminStore();
const storeNavbar = useNavbarStore();
const storeQuestion = useQuestionStore();
const storeAnswer = useAnswerStore();

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, Filler, Tooltip, LineElement, PointElement, RadialLinearScale);

let loaded = ref(false);

let questions = ref({});
let answers = ref({});

let dataQuestion6 = ref({
  labels: [],
  datasets: [
    {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#712bc2'],
        data: []
    }
  ]
});

let dataQuestion7 = ref({
  labels: [],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#712bc2'],
      data: []
    }
  ]
});


let dataQuestion10 = ref({
    labels: [],
    datasets: [
        {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#712bc2'],
            data: []
        }
    ]
});

let radarChart = ref({
labels: [
    'Qualité image',
    "Confort d'uilisation",
    'Connexion réseau',
    'Qualité graphisme 3D',
    'Qualité Audio',
  ],
  datasets: [
    {
      label: "Qualité",
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [0, 0, 0, 0, 0]
    }
  ]
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRati: true
});

const radarOptions = ref({
    responsive: true,
    maintainAspectRati: true,
    scale : {
        min: 0,
        max: 5,
        ticks: {
            stepSize: 1
        }
    }
})

let chartData = ref({
    question6: [],
    question7: [],
    question10: [],
    radarChart: [{count: 0, data: []}, {count: 0, data: []}, {count: 0, data: []}, {count: 0, data: []}, {count: 0, data: []}]
})

let chartTitles = ref({
    question6: "",
    question7: "",
    question10: "",
    radarChart: "Notations qualité",
})

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
    sortAnswers();
})

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

function sortAnswers(){
    storeQuestion.questions.forEach(question => {
        switch(question.id){
            case 6:
                dataQuestion6.value.labels = JSON.parse(question.choices); 
                break;
            case 7:
                dataQuestion7.value.labels = JSON.parse(question.choices); 
                break;
            case 10:
                dataQuestion10.value.labels = JSON.parse(question.choices); 
                break;
            default:
                break;
        }
    });
    
    storeAnswer.answers.forEach(answer => {
        switch(answer.question_id){
            case 6:
                isNaN(chartData.value.question6[dataQuestion6.value.labels.indexOf(answer.content)]) ? chartData.value.question6[dataQuestion6.value.labels.indexOf(answer.content)] = 1 : chartData.value.question6[dataQuestion6.value.labels.indexOf(answer.content)] = chartData.value.question6[dataQuestion6.value.labels.indexOf(answer.content)] + 1;
                dataQuestion6.value.datasets[0].data = chartData.value.question6;
                break;
            case 7:
                isNaN(chartData.value.question7[dataQuestion7.value.labels.indexOf(answer.content)]) ? chartData.value.question7[dataQuestion7.value.labels.indexOf(answer.content)] = 1 : chartData.value.question7[dataQuestion7.value.labels.indexOf(answer.content)] = chartData.value.question7[dataQuestion7.value.labels.indexOf(answer.content)] + 1;
                dataQuestion7.value.datasets[0].data = chartData.value.question7;
                break;
            case 10:
                isNaN(chartData.value.question10[dataQuestion10.value.labels.indexOf(answer.content)]) ? chartData.value.question10[dataQuestion10.value.labels.indexOf(answer.content)] = 1 : chartData.value.question10[dataQuestion10.value.labels.indexOf(answer.content)] = chartData.value.question10[dataQuestion10.value.labels.indexOf(answer.content)] + 1;
                dataQuestion10.value.datasets[0].data = chartData.value.question10;
                break;
            case 11:
                chartData.value.radarChart[0].data.push(answer.content);
                break;
            case 12:
                chartData.value.radarChart[1].data.push(answer.content);
                break;
            case 13:
                chartData.value.radarChart[2].data.push(answer.content);
                break;
            case 14:
                chartData.value.radarChart[3].data.push(answer.content);
                break;
            case 15:
                chartData.value.radarChart[4].data.push(answer.content);
                break;
            default:
                break;
        }

    });
    chartData.value.radarChart.forEach(i => {
        i.data.forEach(l => i.count += Number(l));
    });
    for(let i = 0; i < radarChart.value.datasets[0].data.length; i++){
        radarChart.value.datasets[0].data[i] = Math.round((chartData.value.radarChart[i].count / chartData.value.radarChart[i].data.length) * 100) / 100
    }
    loaded.value = true;
}

</script>

<style>
    #admin-container{
        display: flex;
        flex-direction: row;
        height: 100dvh;
        min-width: 100vw;
    }

    #home-admin{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
        width: 85dvw;
        padding: 50px 0;
    }

    .chart-container{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        width: 40%;
        height: 48%;
    }

    .loading-container{
        position: absolute;
        top: 50%;
        left: 60%;
        transform: translate(-50%, -50%);
    }
</style>