<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import CodeContainer from '@/components/CodeContainer.vue'

const surveyStore = useSurveyStore()
const animateClass = ref(false)

watch(
  () => surveyStore.composeFile,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      animateClass.value = true
      setTimeout(() => (animateClass.value = false), 500)
    }
  },
)
</script>

<template>
  <div
    v-if="surveyStore.composeFile"
    :class="{ 'animate-vote': animateClass }"
    class="space-y-10 font-mono"
  >
    <CodeContainer language="yaml" :code="surveyStore.composeFile" filename="docker-compose.yml" />

    <CodeContainer language="env" :code="surveyStore.envFile" filename=".env" />
  </div>

  <div
    v-else
    class="flex items-center justify-center p-10 text-center text-xl text-slate-600 opacity-90 lg:bg-blue-50 lg:text-3xl"
  >
    Hier erscheint die Konfiguration <br />nach Beantwortung der Fragen.
  </div>
</template>
