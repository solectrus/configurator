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

    expect(wrapper.text()).toContain('Konfigurator')
    expect(wrapper.find('button[name="restart"]').exists()).toBe(false)
  })

  it('renders footer on page > 1', async () => {
    store.survey.nextPage()
    expect(store.survey.currentPageNo).toBe(1)

    const wrapper = mount(TheSurvey)
    expect(wrapper.find('button[name="restart"]').exists()).toBe(true)
    wrapper.find('button[name="restart"]').trigger('click')

    expect(store.survey.currentPageNo).toBe(0)
  })
})
