<script setup lang="ts">
import TheSurvey from '@/components/TheSurvey.vue'
import TheOutput from '@/components/TheOutput.vue'

import { useSurveyStore } from '@/stores/survey'

const store = useSurveyStore()

// store.survey.setValue('devices', ['inverter', 'battery'])
// store.survey.setValue('installation_type', 'local')
// store.survey.setValue('battery_vendor', 'other')
// store.survey.doComplete()
</script>

<template>
  <div class="background-image"></div>

  <div class="flex h-screen w-screen flex-col">
    <svg
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 1626 278"
      class="max-h-16 min-h-16 w-full p-2 lg:mx-auto lg:max-w-80 lg:p-4"
    >
      <path
        d="m3 199c18 18 45 30 82 30 51 0 77-26 77-61 0-43-41-53-72-60-23-5-39-9-39-22 0-11 10-19 28-19 19 0 40 6 55 21l23-30c-19-18-44-27-75-27-45 0-73 26-73 58 0 43 41 51 72 58 22 6 39 11 39 25 0 11-11 22-33 22-27 0-48-12-61-26zm396 27h122v-36h-81v-156h-41zm150 0h136v-36h-95v-44h93v-35h-93v-42h95v-35h-136zm260 3c44 0 68-23 82-47l-36-17c-8 16-25 28-46 28-34 0-59-27-59-63s25-63 59-63c21 0 38 12 46 28l36-18a89 89 0 0 0 -86-46 97 97 0 0 0 -97 99c0 59 45 99 101 99zm150-3h42v-156h56v-36h-154v36h56zm232 0h47l-43-73c21-5 42-23 42-57 0-36-24-62-64-62h-90v192h41v-69h30zm4-131c0 16-12 27-28 27h-43v-53h43c16 0 28 10 28 26zm73 54c0 47 27 80 86 80 58 0 86-32 86-80v-115h-42v114c0 27-15 45-44 45-30 0-45-18-45-45v-114h-41zm196 50c18 18 45 30 82 30 52 0 77-26 77-61 0-43-41-53-72-60-22-5-39-9-39-22 0-11 10-19 29-19 18 0 39 6 55 21l22-30c-19-18-44-27-74-27-46 0-73 26-73 58 0 43 40 51 71 58 23 6 39 11 39 25 0 11-11 22-33 22-27 0-48-12-61-26zm-1163-166a100 100 0 0 1 -24 197l66-135c1-2 0-2-1-4-3-3-2-3-36 5l-31 7zm-64 4-30 116c0 2 3 5 6 5l64-14-21 84a100 100 0 0 1 -19-191z"
        fill="#c7d2fe"
      />
    </svg>

    <main class="flex-1 justify-center lg:flex lg:gap-10">
      <TheSurvey class="no-scrollbar max-w-2xl flex-1" v-if="!store.finished" />

      <TheOutput class="no-scrollbar max-w-4xl flex-1" v-if="store.finished" />
    </main>

    <nav class="flex justify-between gap-5 p-5 lg:fixed lg:bottom-0 lg:right-0">
      <button
        v-if="store.finished || store.survey.currentPageNo > 0"
        type="button"
        name="restart"
        class="inline-flex items-center gap-2 space-x-2 rounded p-2 text-sm text-slate-300 hover:text-white"
        @click="store.back()"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>

        Neustart
      </button>

      <button
        v-if="store.finished || store.survey.currentPageNo > 0"
        type="button"
        name="restart"
        class="inline-flex items-center gap-2 space-x-2 rounded p-2 text-sm text-slate-300 hover:text-red-400"
        @click="store.restart()"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>

        Löschen
      </button>
    </nav>

    <div class="p-5 text-center lg:fixed lg:bottom-0 lg:left-0">
      <a href="https://solectrus.de" class="p-2 text-slate-300 underline underline-offset-2">
        solectrus.de
      </a>
    </div>
  </div>
</template>

<style scoped>
.background-image {
  @apply fixed -z-10 h-screen w-screen bg-cover bg-center;

  background-image: url('/images/background.jpg');
}
</style>
