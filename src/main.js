import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { inject } from "@vercel/analytics";

const pinia = createPinia()
const app = createApp(App);
inject();
app.use(pinia);
app.use(router);
app.mount('#app');
