import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSurveyStore } from '@/stores/survey'

describe('useSurveyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can initializes the store', () => {
    const store = useSurveyStore()
    expect(store.survey).toBeNull()
    expect(store.answers).toStrictEqual({})
    expect(store.finished).toBe(false)
    expect(store.composeFile).toBe('')
    expect(store.envFile).toBe('')
  })

  it('can set survey', () => {
    const store = useSurveyStore()
    const dummySurveyJson = {}
    const survey = store.setSurvey(dummySurveyJson)

    expect(survey).toBeDefined()
    expect(survey).toBe(store.survey)
    expect(store.survey).toBeDefined()
    expect(store.survey?.locale).toBe('de')
  })

  it('can set answers', () => {
    const store = useSurveyStore()
    store.setSurvey({})
    const newAnswers = { test: 'value' }
    store.setAnswers(newAnswers)

    expect(store.answers).toStrictEqual(newAnswers)
    expect(store.finished).toBe(false)
  })
})
