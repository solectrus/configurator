<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'
import CodeContainer from '@/components/CodeContainer.vue'

const surveyStore = useSurveyStore()
</script>

<template>
  <div
    class="flex transform flex-col gap-10 transition-transform duration-500"
    :class="{ 'scale-0': !surveyStore.contentAvailable, 'flex-1': surveyStore.contentAvailable }"
  >
    <CodeContainer
      language="yaml"
      :code="surveyStore.composeFile"
      filename="compose.yml"
      class="flex-1"
    />

    <CodeContainer language="env" :code="surveyStore.envFile" filename=".env" class="flex-1" />
  </div>
</template>
