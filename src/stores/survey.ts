import { defineStore } from 'pinia'
import { FileGeneratorService } from '@/services/FileGeneratorService'

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
      this.composeFile = FileGeneratorService.generateComposeFile(this.answers)
      this.envFile = FileGeneratorService.generateEnvFile(this.answers)
    }
  }
})
