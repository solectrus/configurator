import './styles/app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { surveyPlugin } from 'survey-vue3-ui'

const pinia = createPinia()

createApp(App).use(surveyPlugin).use(pinia).mount('#app')
