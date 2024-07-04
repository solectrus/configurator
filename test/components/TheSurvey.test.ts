import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'

import TheSurvey from '@/components/TheSurvey.vue'
import { useSurveyStore } from '@/stores/survey'

describe('TheSurvey', () => {
  setActivePinia(createPinia())
  const store = useSurveyStore()

  beforeEach(() => {
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }))

    store.initSurvey()
  })

  it('renders properly', async () => {
    const wrapper = mount(TheSurvey)

    expect(wrapper.text()).toContain('Configurator')
  })
})
