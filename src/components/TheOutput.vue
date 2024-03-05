<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSurveyStore } from '@/stores/survey'
import CopyButton from '@/components/CopyButton.vue'

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
    class="space-y-10 bg-blue-50 font-mono"
  >
    <section class="space-y-5 bg-slate-200 px-0 py-5 text-sm lg:px-10">
      <header
        class="sticky top-0 flex items-end justify-between border-b-2 border-slate-800 bg-slate-200 py-2 text-center lg:text-left"
      >
        <h1 class="inline-block rounded-lg bg-slate-800 px-2 py-1 text-slate-100">
          docker-compose.yml
        </h1>

        <CopyButton :text="surveyStore.composeFile" />
      </header>

      <highlightjs language="yaml" :code="surveyStore.composeFile" />
    </section>

    <section class="space-y-5 bg-slate-200 px-0 py-5 text-sm lg:px-10">
      <header
        class="sticky top-0 flex items-end justify-between border-b-2 border-slate-800 bg-slate-200 py-2 text-center lg:text-left"
      >
        <h1 class="inline-block rounded-lg bg-slate-800 px-2 py-1 text-slate-100">.env</h1>

        <CopyButton :text="surveyStore.envFile" />
      </header>

      <highlightjs language="env" :code="surveyStore.envFile" />
    </section>
  </div>

  <div
    v-else
    class="flex items-center justify-center p-10 text-center text-xl text-slate-600 lg:bg-blue-50 lg:text-3xl"
  >
    Hier erscheint die Konfiguration <br />nach Beantwortung der Fragen.
  </div>
</template>
