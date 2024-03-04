<script setup lang="ts">
import TheSurvey from './components/TheSurvey.vue'
import TheOutput from './components/TheOutput.vue'
</script>

<template>
  <main class="lg:flex lg:gap-10 w-screen relative">
    <TheSurvey class="lg:h-screen overflow-y-scroll max-w-lg w-full" />
    <TheOutput class="flex-1 lg:h-screen overflow-y-scroll" />
  </main>
</template>
