import { config } from '@vue/test-utils'
import { surveyPlugin } from 'survey-vue3-ui'
import { createPinia, setActivePinia } from 'pinia'

config.global.plugins = [[surveyPlugin]]

beforeEach(() => {
  const pinia = createPinia()
  setActivePinia(pinia)
})
