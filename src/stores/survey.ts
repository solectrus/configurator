import { defineStore } from 'pinia'
import { Model } from 'survey-core'
import 'survey-core/i18n/german'
import { BorderlessLight } from 'survey-core/themes/borderless-light'

import type { Answers } from '@/types/answers'

import { EnvGenerator } from '@/services/EnvGenerator'
import { ComposeGenerator } from '@/services/ComposeGenerator'
import surveyJson from '@/assets/survey.json'

interface SurveyState {
  answers: Answers | null
  finished: boolean
  composeFile: string
  envFile: string
}

let survey: Model

export const useSurveyStore = defineStore('survey', {
  state: (): SurveyState => ({
    answers: null,
    finished: false,
    composeFile: '',
    envFile: '',
  }),

  getters: {
    contentAvailable: (state): boolean => Boolean(state.composeFile && state.envFile),
    survey: (): Model => survey,
  },

  actions: {
    initSurvey() {
      survey = new Model(surveyJson)
      survey.applyTheme(BorderlessLight)
      survey.locale = 'de'
      survey.onValueChanged.add((sender) => this.setAnswers(sender.data))
      survey.onComplete.add(() => (this.finished = true))
      this.setAnswers(null)
    },

    setAnswers(newAnswers: Answers | null) {
      this.answers = newAnswers
      this.finished = false

      if (this.answers) {
        const compose = new ComposeGenerator(this.answers).build()

        this.composeFile = compose.text()
        this.envFile = new EnvGenerator(compose.raw(), this.answers).build()
      } else {
        this.composeFile = this.envFile = ''
      }
    },

    restart() {
      this.survey.clear(true, true)
      this.setAnswers(null)
    },

    back() {
      this.survey.clear(false, true)
      this.finished = false
    },
  },
})
