import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SurveyPage from './pages/SurveyPage.vue'
import AnswerPage from './pages/AnswerPage.vue'
import ResponsePage from './pages/ResponsePage.vue'
import AdminPage from "./pages/admin/AdminPage.vue";
import LoginPage from "./pages/admin/LoginPage.vue";
import AdminSurvey from "./pages/admin/AdminSurvey.vue";
import AdminAnswer from "./pages/admin/AdminAnswer.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: HomePage},
        {path: '/survey', component: SurveyPage},
        {path: '/answer/:id', component: AnswerPage},
        {path: '/submit_survey', component: ResponsePage},
        {path: '/administration', component: AdminPage},
        {path: '/administration/login', component: LoginPage},
        {path: '/administration/questionnaire', component: AdminSurvey},
        {path: '/administration/reponses', component: AdminAnswer},
    ]
  })

export default router