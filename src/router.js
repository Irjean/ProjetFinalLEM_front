import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import SurveyPage from './pages/SurveyPage.vue'
import LoginPage from "./pages/LoginPage.vue";
import AdminPage from "./pages/AdminPage.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: HomePage},
        {path: '/survey', component: SurveyPage},
        {path: '/login', component: LoginPage},
        {path: '/admin', component: AdminPage},
    ]
  })

export default router