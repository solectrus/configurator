import { defineStore } from 'pinia'

type Answer = string | number | boolean

interface SurveyState {
  answers: Record<string, Answer>
}

export const useSurveyStore = defineStore('survey', {
  state: (): SurveyState => ({
    answers: {}
  }),

  actions: {
    setAnswers(newAnswers: Record<string, Answer>) {
      this.answers = newAnswers
    }
  }
})
