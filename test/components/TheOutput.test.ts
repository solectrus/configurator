import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import TheOutput from '@/components/TheOutput.vue'
import { useSurveyStore } from '@/stores/survey'

describe('TheOutput', () => {
  setActivePinia(createPinia())
  const store = useSurveyStore()

  beforeEach(() => {
    store.initSurvey()
  })

  it('renders properly', async () => {
    const wrapper = shallowMount(TheOutput)

    expect(wrapper.html()).toContain('compose.yml')
    expect(wrapper.html()).toContain('.env')
  })
})
