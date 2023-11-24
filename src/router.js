import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SurveyPage from './pages/SurveyPage.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: HomePage},
        {path: '/survey', component: SurveyPage},
    ]
  })

export default router