import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSurveyStore } from '@/stores/survey'
import type { Answers } from '@/types/answers'

describe('useSurveyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can initializes the store', () => {
    const store = useSurveyStore()
    expect(store.answers).toBeNull()
    expect(store.finished).toBe(false)
    expect(store.composeFile).toBe('')
    expect(store.envFile).toBe('')
  })

  it('can set survey', () => {
    const store = useSurveyStore()
    store.setupSurvey()

    expect(store.survey).toBeDefined()
    expect(store.survey.locale).toBe('de')
  })

  it('can set answers', () => {
    const store = useSurveyStore()
    store.setupSurvey()
    const newAnswers: Answers = { installation_date: '2021-01-01' }
    store.setAnswers(newAnswers)

    expect(store.answers).toStrictEqual(newAnswers)
    expect(store.finished).toBe(false)
  })

  it('can reset the survey', () => {
    const store = useSurveyStore()
    store.setupSurvey()
    store.setAnswers({ installation_date: '2021-01-01' })
    store.reset()

    expect(store.survey).toBeDefined()
    expect(store.answers).toBeNull()
    expect(store.finished).toBe(false)
  })
})
