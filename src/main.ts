// Vue 3
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { useSurveyStore } from '@/stores/survey'

// SurveyJS
import { surveyPlugin } from 'survey-vue3-ui'

// Highlight.js
import hljs from 'highlight.js/lib/core'
import yaml from 'highlight.js/lib/languages/yaml'
import env from 'highlight.js/lib/languages/properties'
import hljsVuePlugin from '@highlightjs/vue-plugin'

// Styles
import './styles/app.css'

// Register languages for Highlight.js
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('env', env)

import Plausible from 'plausible-tracker'

const { enableAutoPageviews } = Plausible({
  domain: 'configurator.solectrus.de',
  apiHost: 'https://p.solectrus.de',
})
enableAutoPageviews()

// Go!
const app = createApp(App)
app.use(createPinia())
app.use(surveyPlugin)
app.use(hljsVuePlugin)

const store = useSurveyStore()
store.initSurvey()

app.mount('#app')
