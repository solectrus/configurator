<script setup lang="ts">
import TheWelcome from './components/TheWelcome.vue'
import TheOutput from './components/TheOutput.vue'
</script>

<template>
  <main class="flex gap-10 w-screen">
    <TheWelcome class="flex-1" />

    <TheOutput class="flex-1" />
  </main>
</template>
