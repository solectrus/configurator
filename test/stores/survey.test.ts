import { createPinia, setActivePinia } from 'pinia'
import { useSurveyStore } from '@/stores/survey'
import type { Answers } from '@/types/answers'

function setLanguages(languages: string[]) {
  Object.defineProperty(navigator, 'languages', {
    value: languages,
    configurable: true,
  })
}

describe('useSurveyStore', () => {
  let originalLanguages: PropertyDescriptor | undefined

  beforeEach(() => {
    setActivePinia(createPinia())
    originalLanguages = Object.getOwnPropertyDescriptor(navigator, 'languages')
  })

  afterEach(() => {
    if (originalLanguages) Object.defineProperty(navigator, 'languages', originalLanguages)
  })

  it('can initializes the store', () => {
    const store = useSurveyStore()
    expect(store.answers).toBeNull()
    expect(store.finished).toBe(false)
    expect(store.composeFile).toBe('')
    expect(store.envFile).toBe('')
  })

  it('can setup survey', () => {
    const store = useSurveyStore()
    store.initSurvey()

    expect(store.survey).toBeDefined()
  })

  it('can choose DE as language', () => {
    setLanguages(['de-DE', 'en-US'])

    const store = useSurveyStore()
    store.initSurvey()

    expect(store.survey.locale).toBe('de')
  })

  it('can choose EN as language', () => {
    setLanguages(['en-US', 'de-DE'])

    const store = useSurveyStore()
    store.initSurvey()

    expect(store.survey.locale).toBe('')
  })

  it('can choose EN as fallback language', () => {
    setLanguages(['fr-FR', 'es-ES'])

    const store = useSurveyStore()
    store.initSurvey()

    expect(store.survey.locale).toBe('') // default is 'en'
  })

  it('can set answers', () => {
    const store = useSurveyStore()
    store.initSurvey()
    const newAnswers: Answers = { devices: ['inverter'], installation_type: 'local' }
    store.setAnswers(newAnswers)

    expect(store.answers).toStrictEqual(newAnswers)
    expect(store.finished).toBe(false)
  })

  it('can restart the survey', () => {
    const store = useSurveyStore()
    store.initSurvey()
    store.setAnswers({ installation_date: '2021-01-01' })
    store.restart()

    expect(store.survey).toBeDefined()
    expect(store.answers).toBeNull()
    expect(store.finished).toBe(false)
  })

  it('can go back', () => {
    const store = useSurveyStore()
    store.initSurvey()
    store.setAnswers({ installation_date: '2021-01-01' })
    store.back()

    expect(store.survey.currentPageNo).toBe(0)
    expect(store.answers).toEqual({ installation_date: '2021-01-01' })
    expect(store.finished).toBe(false)
  })
})
