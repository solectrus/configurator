<script setup lang="ts">
import TheSurvey from '@/components/TheSurvey.vue'
import TheOutput from '@/components/TheOutput.vue'

import { useSurveyStore } from '@/stores/survey'
import surveyJson from '@/assets/survey.json'

const surveyStore = useSurveyStore()
surveyStore.setSurvey(surveyJson)
</script>

<template>
  <div class="h-screen w-screen flex flex-col">
    <header class="w-full bg-yellow-200 text-yellow-700 p-2 text-center font-bold">
      Unfertig, bitte noch nicht verwenden!
    </header>

    <main class="flex-1 lg:flex lg:gap-10 lg:overflow-hidden">
      <TheSurvey class="w-full max-w-2xl lg:overflow-y-scroll lg:h-full" />
      <TheOutput class="flex-1 lg:h-full lg:overflow-y-scroll" />
    </main>

    <footer class="p-2 bg-slate-100 text-left text-sm">
      <a class="underline underline-offset-2" href="https://solectrus.de">solectrus.de</a>
    </footer>
  </div>
</template>
