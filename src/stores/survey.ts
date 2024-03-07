import { defineStore } from 'pinia'
import { Model } from 'survey-core'
import 'survey-core/i18n/german'
import { EnvGeneratorService } from '@/services/EnvGeneratorService'
import { ComposeGeneratorService } from '@/services/ComposeGeneratorService'

import type { Answers } from '@/types/answers'

interface SurveyState {
  survey: Model | null
  answers: Answers | null
  finished: boolean
  composeFile: string
  envFile: string
}

export const useSurveyStore = defineStore('survey', {
  state: (): SurveyState => ({
    survey: null,
    answers: null,
    finished: false,
    composeFile: '',
    envFile: '',
  }),

  actions: {
    setSurvey(surveyJson: any) {
      this.survey = new Model(surveyJson)
      this.survey.locale = 'de'
      this.survey.onValueChanged.add((sender) => this.setAnswers(sender.data))
      this.survey.onComplete.add(() => (this.finished = true))

      return this.survey
    },

    setAnswers(newAnswers: Answers) {
      this.answers = newAnswers
      this.finished = false

      const compose = new ComposeGeneratorService(this.answers).build()

      this.composeFile = compose.text()
      this.envFile = new EnvGeneratorService(compose.raw(), this.answers).build()
    },
  },
})
