import { createApp } from 'vue'
import App from './App.vue'
import { surveyPlugin } from 'survey-vue3-ui'
import './styles/app.css'

createApp(App).use(surveyPlugin).mount('#app')
