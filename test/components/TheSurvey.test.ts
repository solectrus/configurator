import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TheSurvey from '@/components/TheSurvey.vue'
import { useSurveyStore } from '@/stores/survey'

describe('TheSurvey', () => {
  it('renders properly', async () => {
    const store = useSurveyStore()
    store.setupSurvey()

    const wrapper = mount(TheSurvey)
    expect(wrapper.text()).toContain('Konfigurator')
  })
})
