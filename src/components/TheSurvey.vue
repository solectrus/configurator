<script setup lang="ts">
import { useSurveyStore } from '@/stores/survey'
const store = useSurveyStore()
</script>

<template>
  <div class="py-20">
    <div v-if="store.survey">
      <svg
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 1626 278"
        class="mx-auto mb-5 max-w-80"
      >
        <path
          d="m3 199c18 18 45 30 82 30 51 0 77-26 77-61 0-43-41-53-72-60-23-5-39-9-39-22 0-11 10-19 28-19 19 0 40 6 55 21l23-30c-19-18-44-27-75-27-45 0-73 26-73 58 0 43 41 51 72 58 22 6 39 11 39 25 0 11-11 22-33 22-27 0-48-12-61-26zm396 27h122v-36h-81v-156h-41zm150 0h136v-36h-95v-44h93v-35h-93v-42h95v-35h-136zm260 3c44 0 68-23 82-47l-36-17c-8 16-25 28-46 28-34 0-59-27-59-63s25-63 59-63c21 0 38 12 46 28l36-18a89 89 0 0 0 -86-46 97 97 0 0 0 -97 99c0 59 45 99 101 99zm150-3h42v-156h56v-36h-154v36h56zm232 0h47l-43-73c21-5 42-23 42-57 0-36-24-62-64-62h-90v192h41v-69h30zm4-131c0 16-12 27-28 27h-43v-53h43c16 0 28 10 28 26zm73 54c0 47 27 80 86 80 58 0 86-32 86-80v-115h-42v114c0 27-15 45-44 45-30 0-45-18-45-45v-114h-41zm196 50c18 18 45 30 82 30 52 0 77-26 77-61 0-43-41-53-72-60-22-5-39-9-39-22 0-11 10-19 29-19 18 0 39 6 55 21l22-30c-19-18-44-27-74-27-46 0-73 26-73 58 0 43 40 51 71 58 23 6 39 11 39 25 0 11-11 22-33 22-27 0-48-12-61-26zm-1163-166a100 100 0 0 1 -24 197l66-135c1-2 0-2-1-4-3-3-2-3-36 5l-31 7zm-64 4-30 116c0 2 3 5 6 5l64-14-21 84a100 100 0 0 1 -19-191z"
          fill="#c7d2fe"
        />
      </svg>

      <div v-if="store.survey.finished" class="my-10 rounded-r bg-slate-300/90 p-6 text-slate-600">
        <h1 class="text-xl font-bold">Konfiguration erstellt</h1>

        <p class="mt-5 text-lg">
          Kopiere die zwei individuell für dich erstellen Konfigurations-Dateien auf deinen Server
          &dash; und los geht's!
        </p>
      </div>

      <SurveyComponent v-else :model="store.survey" class="rounded-r" />

      <div class="mt-2 flex items-end justify-between p-2 pr-0 text-center lg:text-right">
        <a href="https://solectrus.de" class="p-2 text-slate-300 underline underline-offset-2">
          solectrus.de
        </a>

        <button
          v-if="store.survey.currentPageNo > 0"
          type="button"
          name="restart"
          class="inline-flex items-center gap-2 space-x-2 rounded p-2 text-sm text-slate-300 hover:bg-red-400 hover:text-white"
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Neu starten
        </button>
      </div>
    </div>
  </div>
</template>
