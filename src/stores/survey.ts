import { defineStore } from 'pinia'
import { EnvGeneratorService } from '@/services/EnvGeneratorService'
import { ComposeGeneratorService } from '@/services/ComposeGeneratorService'

export type Answer = string | number | boolean
export type Answers = Record<string, Answer>

interface SurveyState {
  answers: Answers
  finished: boolean
  composeFile: string
  envFile: string
}

export const useSurveyStore = defineStore('survey', {
  state: (): SurveyState => ({
    answers: {},
    finished: false,
    composeFile: '',
    envFile: ''
  }),

  actions: {
    setAnswers(newAnswers: Answers) {
      this.answers = newAnswers
      this.finished = false
      this.composeFile = new ComposeGeneratorService(this.answers).build()
      this.envFile = EnvGeneratorService.generate(this.answers)
    },

    finish() {
      this.finished = true
    }
  }
})
