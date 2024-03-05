<script setup lang="ts">
import TheSurvey from '@/components/TheSurvey.vue'
import TheOutput from '@/components/TheOutput.vue'

import { useSurveyStore } from '@/stores/survey'
import surveyJson from '@/assets/survey.json'

const surveyStore = useSurveyStore()
surveyStore.setSurvey(surveyJson)
</script>

<template>
  <main class="lg:flex lg:gap-10 w-screen relative">
    <TheSurvey class="lg:h-screen overflow-y-scroll max-w-lg w-full" />
    <TheOutput class="flex-1 lg:h-screen overflow-y-scroll" />
  </main>
</template>
