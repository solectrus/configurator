<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'
const surveyStore = useSurveyStore()
</script>

<template>
  <div class="py-20">
    <div v-if="surveyStore.survey">
      <SurveyComponent :model="surveyStore.survey" class="rounded-r" />

      <div class="mt-2 flex items-end justify-between p-2 pr-0 text-center lg:text-right">
        <a class="p-2 text-slate-300 underline underline-offset-2" href="https://solectrus.de"
          >solectrus.de
        </a>

        <a
          class="inline-flex items-center gap-2 space-x-2 rounded p-2 text-sm text-slate-300 hover:bg-red-400 hover:text-white"
          href="/"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          Neu starten
        </a>
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
