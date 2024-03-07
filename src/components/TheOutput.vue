<script setup lang="ts">
import { computed } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import CodeContainer from '@/components/CodeContainer.vue'

const surveyStore = useSurveyStore()
const contentAvailable = computed(() => surveyStore.composeFile || surveyStore.envFile)
</script>

<template>
  <div
    class="flex transform flex-col gap-10 transition-transform duration-500"
    :class="{ 'scale-0': !contentAvailable, 'flex-1': contentAvailable }"
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
