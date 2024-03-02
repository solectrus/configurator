<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'
const surveyStore = useSurveyStore()
</script>

<template>
  <div class="font-mono bg-slate-100 space-y-10">
    <section class="bg-slate-200 px-10 py-5">
      <header>
        <h1 class="text-xl font-bold">Antworten</h1>
      </header>

      <pre>{{ surveyStore.answers }}</pre>
    </section>

    <section class="bg-slate-200 px-10 py-5 space-y-5">
      <header>
        <h1 class="text-xl font-bold">docker-compose.yml</h1>
      </header>

      <pre>{{ surveyStore.composeFile }}</pre>
    </section>

    <section class="bg-slate-200 px-10 py-5 space-y-5">
      <header>
        <h1 class="text-xl font-bold">.env</h1>
      </header>

      <pre>{{ surveyStore.envFile }}</pre>
    </section>
  </div>
</template>
