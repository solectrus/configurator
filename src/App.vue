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
  <div class="background-image"></div>

  <div class="flex h-screen w-screen flex-col">
    <main class="flex-1 lg:flex lg:gap-10 lg:overflow-hidden">
      <TheSurvey class="no-scrollbar w-full max-w-2xl lg:h-full lg:overflow-y-scroll" />
      <TheOutput class="no-scrollbar flex-1 lg:h-full lg:overflow-y-scroll" />
    </main>
  </div>
</template>

<style scoped>
.background-image {
  @apply fixed -z-10 h-screen w-screen bg-cover bg-center;

  background-image: url('/images/background.jpg');
}
</style>
