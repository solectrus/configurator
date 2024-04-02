import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useSurveyStore } from '@/stores/survey'

import App from '@/App.vue'

describe('App', () => {
  let store: ReturnType<typeof useSurveyStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useSurveyStore()
    store.initSurvey()
  })

  it('can mount when not finished', () => {
    store.survey.setValue('devices', ['inverter'])
    store.survey.setValue('installation_type', 'local')

    const wrapper = shallowMount(App)
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('button[name="restart"]').exists()).toBe(false)
  })

  it('renders footer on page > 1', () => {
    store.survey.nextPage()
    expect(store.survey.currentPageNo).toBe(1)

    const wrapper = shallowMount(App)
    expect(wrapper.find('button[name="restart"]').exists()).toBe(true)
    wrapper.find('button[name="restart"]').trigger('click')

    expect(store.survey.currentPageNo).toBe(0)
  })

  it('can mount when finished', () => {
    store.survey.doComplete()
    expect(store.finished).toBe(true)

    const wrapper = shallowMount(App)
    expect(wrapper.element).toMatchSnapshot()
  })
})
