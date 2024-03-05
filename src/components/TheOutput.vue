<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'

const surveyStore = useSurveyStore()
</script>

<template>
  <div v-if="surveyStore.composeFile" class="font-mono bg-slate-100 space-y-10">
    <section class="bg-slate-200 px-0 lg:px-10 py-5 space-y-5 text-sm">
      <header
        class="sticky top-0 bg-slate-200 py-2 border-b-2 border-green-600 text-center lg:text-left"
      >
        <h1 class="bg-slate-800 text-slate-100 py-1 px-2 rounded-lg inline-block">
          docker-compose.yml
        </h1>
      </header>

      <highlightjs language="yaml" :code="surveyStore.composeFile" />
    </section>

    <section class="bg-slate-200 px-0 lg:px-10 py-5 space-y-5 text-sm">
      <header
        class="sticky top-0 bg-slate-200 py-2 border-b-2 border-green-600 text-center lg:text-left"
      >
        <h1 class="bg-slate-800 text-slate-100 py-1 px-2 rounded-lg inline-block">.env</h1>
      </header>

      <highlightjs language="env" :code="surveyStore.envFile" />
    </section>
  </div>

  <div
    v-else
    class="flex items-center justify-center lg:bg-slate-100 text-slate-600 text-xl lg:text-3xl p-10"
  >
    Noch keine Konfiguration vorhanden
  </div>
</template>
