import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import TheSurvey from '@/components/TheSurvey.vue'
import { useSurveyStore } from '@/stores/survey'

describe('TheSurvey', () => {
  setActivePinia(createPinia())
  const store = useSurveyStore()

  beforeEach(() => {
    store.initSurvey()
  })

  it('renders properly', async () => {
    const wrapper = mount(TheSurvey)

    expect(wrapper.text()).toContain('Configurator')
  })
})
