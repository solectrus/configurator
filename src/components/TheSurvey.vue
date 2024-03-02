<script setup lang="ts">
import 'survey-core/defaultV2.min.css'
import 'survey-core/i18n/german'
import { onMounted, ref } from 'vue'
import { Model } from 'survey-core'

import { useSurveyStore } from '@/stores/survey'
const surveyStore = useSurveyStore()

const survey = ref<Model | null>(null)

onMounted(async () => {
  const surveyConfigUrl = '/survey.json'
  try {
    const response = await fetch(surveyConfigUrl)
    if (!response.ok) throw new Error('Failed to load survey configuration')

    const surveyJson = await response.json()
    survey.value = new Model(surveyJson)
    survey.value.locale = 'de'
    survey.value.onValueChanged.add((sender) => surveyStore.setAnswers(sender.data))
  } catch (error) {
    console.error('Error loading survey config:', error)
  }
})
</script>

<template>
  <div v-if="survey">
    <SurveyComponent :model="survey" />
  </div>
</template>
