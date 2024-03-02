<script setup lang="ts">
import TheSurvey from './components/TheSurvey.vue'
import TheOutput from './components/TheOutput.vue'
</script>

<template>
  <main class="lg:flex lg:gap-10 w-screen relative">
    <TheSurvey class="min-w-fit h-full" />
    <TheOutput class="flex-1 lg:h-screen overflow-y-scroll" />
  </main>
</template>
