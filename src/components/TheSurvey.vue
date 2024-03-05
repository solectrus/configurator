<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'
const surveyStore = useSurveyStore()
</script>

<template>
  <div>
    <div v-if="surveyStore.survey">
      <SurveyComponent :model="surveyStore.survey" />

      <div class="mt-2 p-2 pr-0 text-center lg:text-right">
        <a
          class="space-x-2 rounded p-2 text-sm text-slate-500 hover:bg-red-300 hover:text-white"
          href="/"
          >↻ Neu starten</a
        >
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
