import { defineStore } from 'pinia'
import { Model } from 'survey-core'
import 'survey-core/i18n/german'
import { BorderlessLight } from 'survey-core/themes/borderless-light'

import type { Answers } from '@/types/answers'

import { ReadmeGenerator } from '@/services/ReadmeGenerator'
import { EnvGenerator } from '@/services/EnvGenerator'
import { ComposeGenerator } from '@/services/ComposeGenerator'
import surveyJson from '@/assets/survey.json'

interface SurveyState {
  locale: string
  answers: Answers | null
  finished: boolean
  readmeFile: string
  composeFile: string
  envFile: string
}

let survey: Model

export const useSurveyStore = defineStore('survey', {
  state: (): SurveyState => {
    const preferredLanguages = navigator.languages.map((lang) => lang.substring(0, 2))

    return {
      locale: preferredLanguages.find((lang) => lang === 'en' || lang === 'de') ?? 'en',
      answers: null,
      finished: false,
      readmeFile: '',
      composeFile: '',
      envFile: '',
    }
  },

  getters: {
    survey: (): Model => survey,
  },

  actions: {
    initSurvey() {
      survey = new Model(surveyJson)
      survey.applyTheme(BorderlessLight)
      survey.locale = this.locale
      survey.onValueChanged.add((sender) => this.setAnswers(sender.data))
      survey.onComplete.add(() => (this.finished = true))
      this.setAnswers(null)
    },

    setAnswers(newAnswers: Answers | null) {
      this.answers = newAnswers
      this.finished = false

      if (this.answers) {
        new ReadmeGenerator(this.answers, this.locale)
          .build()
          .then((readme) => (this.readmeFile = readme))

        const compose = new ComposeGenerator(this.answers).build()
        this.composeFile = compose.text()
        this.envFile = new EnvGenerator(compose.raw(), this.answers).build()
      } else {
        this.readmeFile = this.composeFile = this.envFile = ''
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
