import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TheSurvey from '@/components/TheSurvey.vue'
import { useSurveyStore } from '@/stores/survey'
import surveyJson from '@/assets/survey.json'

describe('TheSurvey', () => {
  it('renders properly', async () => {
    const surveyStore = useSurveyStore()
    surveyStore.setSurvey(surveyJson)

    const wrapper = mount(TheSurvey)
    expect(wrapper.text()).toContain('SOLECTRUS-Konfigurator')
  })
})
