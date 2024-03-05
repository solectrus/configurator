<script setup lang="ts">
import { onMounted } from 'vue'
import TheSurvey from '@/components/TheSurvey.vue'
import TheOutput from '@/components/TheOutput.vue'

import { useSurveyStore } from '@/stores/survey'
import surveyJson from '@/assets/survey.json'

import { BorderlessLight } from 'survey-core/themes/borderless-light'

onMounted(() => {
  const surveyStore = useSurveyStore()
  surveyStore.setSurvey(surveyJson).applyTheme(BorderlessLight)
})
</script>

<template>
  <div class="flex h-screen w-screen flex-col">
    <header class="w-full bg-yellow-200 p-2 text-center font-bold text-yellow-700">
      !!! Work in progress !!!
    </header>

    <main class="flex-1 lg:flex lg:gap-10 lg:overflow-hidden">
      <TheSurvey class="w-full max-w-2xl lg:h-full lg:overflow-y-scroll" />
      <TheOutput class="flex-1 lg:h-full lg:overflow-y-scroll" />
    </main>

    <footer class="bg-slate-100 p-2 text-left text-sm">
      <a class="underline underline-offset-2" href="https://solectrus.de">solectrus.de</a>
    </footer>
  </div>
</template>
