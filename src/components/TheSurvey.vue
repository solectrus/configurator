<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'
const surveyStore = useSurveyStore()
</script>

<template>
  <div>
    <div v-if="surveyStore.survey">
      <SurveyComponent :model="surveyStore.survey" />

      <div class="text-right">
        <a class="text-slate-500 underline text-sm" href="/">Neu starten</a>
      </div>
    </div>

    <div v-if="surveyStore.finished" class="p-6 text-slate-600">
      <h1 class="text-xl font-bold uppercase tracking-wide">Fertig!</h1>

      <p class="mt-5 text-lg">
        Kopiere die nebenstehenden Konfigurations-Dateien auf deinen Server und los gehts!
      </p>
    </div>
  </div>
</template>
