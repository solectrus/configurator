import { defineStore } from 'pinia'
import { Model } from 'survey-core'
import 'survey-core/i18n/german'
import { BorderlessLight } from 'survey-core/themes/borderless-light'

import { EnvGeneratorService } from '@/services/EnvGeneratorService'
import { ComposeGeneratorService } from '@/services/ComposeGeneratorService'

import type { Answers } from '@/types/answers'

interface SurveyState {
  surveyJson: any | null
  survey: Model | null
  answers: Answers | null
  finished: boolean
  composeFile: string
  envFile: string
}

export const useSurveyStore = defineStore('survey', {
  state: (): SurveyState => ({
    surveyJson: null,
    survey: null,
    answers: null,
    finished: false,
    composeFile: '',
    envFile: '',
  }),

  actions: {
    setSurvey(surveyJson: any) {
      this.surveyJson = surveyJson
      this.survey = new Model(surveyJson)
      this.survey.applyTheme(BorderlessLight)
      this.survey.locale = 'de'
      this.survey.onValueChanged.add((sender) => this.setAnswers(sender.data))
      this.survey.onComplete.add(() => (this.finished = true))
      this.setAnswers(null)

      return this.survey
    },

    setAnswers(newAnswers: Answers | null) {
      this.answers = newAnswers
      this.finished = false

      if (this.answers) {
        const compose = new ComposeGeneratorService(this.answers).build()

        this.composeFile = compose.text()
        this.envFile = new EnvGeneratorService(compose.raw(), this.answers).build()
      } else {
        this.composeFile = this.envFile = ''
      }
    },

    reset() {
      if (this.survey) {
        // this.survey.clear(true, true) does not work as expected (it does not go to the first page)
        // so we have to do it manually
        this.setSurvey(this.surveyJson)
      }
    },
  },
})
