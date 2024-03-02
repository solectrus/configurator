import './styles/app.css'

import { createApp } from 'vue'
import App from './App.vue'
import { surveyPlugin } from 'survey-vue3-ui'

createApp(App).use(surveyPlugin).mount('#app')
