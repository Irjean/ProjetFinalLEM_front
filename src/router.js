import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SurveyPage from './pages/SurveyPage.vue'
import AnswerPage from './pages/AnswerPage.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: HomePage},
        {path: '/survey', component: SurveyPage},
        {path: '/answer/:id', component: AnswerPage},
    ]
  })

export default router