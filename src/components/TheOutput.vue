<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'

const surveyStore = useSurveyStore()
</script>

<template>
  <div v-if="surveyStore.composeFile" class="space-y-10 bg-slate-100 font-mono">
    <section class="space-y-5 bg-slate-200 px-0 py-5 text-sm lg:px-10">
      <header
        class="sticky top-0 border-b-2 border-green-600 bg-slate-200 py-2 text-center lg:text-left"
      >
        <h1 class="inline-block rounded-lg bg-slate-800 px-2 py-1 text-slate-100">
          docker-compose.yml
        </h1>
      </header>

      <highlightjs language="yaml" :code="surveyStore.composeFile" />
    </section>

    <section class="space-y-5 bg-slate-200 px-0 py-5 text-sm lg:px-10">
      <header
        class="sticky top-0 border-b-2 border-green-600 bg-slate-200 py-2 text-center lg:text-left"
      >
        <h1 class="inline-block rounded-lg bg-slate-800 px-2 py-1 text-slate-100">.env</h1>
      </header>

      <highlightjs language="env" :code="surveyStore.envFile" />
    </section>
  </div>

  <div
    v-else
    class="flex items-center justify-center p-10 text-xl text-slate-600 lg:bg-slate-100 lg:text-3xl"
  >
    Noch keine Konfiguration vorhanden
  </div>
</template>
