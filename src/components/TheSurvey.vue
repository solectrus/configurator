<script setup lang="ts">
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
    survey.value.onComplete.add(() => surveyStore.finish())
  } catch (error) {
    console.error('Error loading survey config:', error)
  }
})
</script>

<template>
  <div>
    <div v-if="survey">
      <SurveyComponent :model="survey" />
    </div>

    <div v-if="surveyStore.finished" class="p-6 text-slate-600">
      <h1 class="text-xl font-bold uppercase tracking-wide">Fertig!</h1>

      <p class="mt-5 text-lg">
        Kopiere die nebenstehenden Konfigurations-Dateien auf deinen Server und los gehts!
      </p>
    </div>
  </div>
</template>
