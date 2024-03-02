<script setup lang="ts">
import TheSurvey from './components/TheSurvey.vue'
import TheOutput from './components/TheOutput.vue'
</script>

<template>
  <main class="lg:flex lg:gap-10">
    <TheSurvey class="flex-1" />
    <TheOutput class="flex-1 lg:h-screen" />
  </main>
</template>
