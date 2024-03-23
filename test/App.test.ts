import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useSurveyStore } from '@/stores/survey'

import App from '@/App.vue'

describe('App', () => {
  setActivePinia(createPinia())
  const store = useSurveyStore()

  beforeEach(() => {
    store.initSurvey()
  })

  it('can mount with content available', () => {
    store.survey.setValue('devices', ['inverter'])
    store.survey.setValue('installation_type', 'local')
    expect(store.contentAvailable).toBe(true)

    const wrapper = shallowMount(App)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('can mount without content available', () => {
    expect(store.contentAvailable).toBe(false)

    const wrapper = shallowMount(App)
    expect(wrapper.element).toMatchSnapshot()
  })
})
