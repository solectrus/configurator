import './styles/app.css'
import 'highlight.js/styles/github.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { surveyPlugin } from 'survey-vue3-ui'
import hljs from 'highlight.js/lib/core'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import yaml from 'highlight.js/lib/languages/yaml'
import env from 'highlight.js/lib/languages/properties'

hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('env', env)

const app = createApp(App)
app.use(hljsVuePlugin)
app.use(surveyPlugin)
app.use(createPinia())
app.mount('#app')
