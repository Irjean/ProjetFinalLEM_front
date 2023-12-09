import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SurveyPage from './pages/SurveyPage.vue'
import ResponsePage from './pages/ResponsePage.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: HomePage},
        {path: '/survey', component: SurveyPage},
        {path: '/submit_survey', component: ResponsePage},
    ]
  })

export default router