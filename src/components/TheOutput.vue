<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'
import CodeContainer from '@/components/CodeContainer.vue'

const surveyStore = useSurveyStore()
</script>

<template>
  <div class="space-y-10 font-mono">
    <CodeContainer language="yaml" :code="surveyStore.composeFile" filename="docker-compose.yml" />

    <CodeContainer language="env" :code="surveyStore.envFile" filename=".env" />
  </div>
</template>
