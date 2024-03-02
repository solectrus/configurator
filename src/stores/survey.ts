import { defineStore } from 'pinia'
import { EnvGeneratorService } from '@/services/EnvGeneratorService'
import { ComposeGeneratorService } from '@/services/ComposeGeneratorService'

export type Answer = string | number | boolean
export type Answers = Record<string, Answer>

interface SurveyState {
  answers: Answers
  composeFile: string
  envFile: string
}

export const useSurveyStore = defineStore('survey', {
  state: (): SurveyState => ({
    answers: {},
    composeFile: '',
    envFile: ''
  }),

  actions: {
    setAnswers(newAnswers: Answers) {
      this.answers = newAnswers
      this.composeFile = ComposeGeneratorService.generate(this.answers)
      this.envFile = EnvGeneratorService.generate(this.answers)
    }
  }
})
