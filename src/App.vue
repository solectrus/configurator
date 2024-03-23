<script setup lang="ts">
import TheSurvey from '@/components/TheSurvey.vue'
import TheOutput from '@/components/TheOutput.vue'

import { useSurveyStore } from '@/stores/survey'

const store = useSurveyStore()
</script>

<template>
  <div class="background-image"></div>

  <div class="flex h-screen w-screen flex-col">
    <main class="flex-1 justify-center lg:flex lg:gap-10 lg:overflow-hidden">
      <TheSurvey class="no-scrollbar max-w-2xl flex-1 lg:overflow-y-scroll" />
      <TheOutput class="no-scrollbar lg:overflow-y-scroll" v-if="store.contentAvailable" />
    </main>
  </div>
</template>

<style scoped>
.background-image {
  @apply fixed -z-10 h-screen w-screen bg-cover bg-center;

  background-image: url('/images/background.jpg');
}
</style>
