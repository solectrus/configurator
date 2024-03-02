<script setup lang="ts">
import { watch, nextTick } from 'vue'

import { useSurveyStore } from '@/stores/survey'

const surveyStore = useSurveyStore()

import hljs from 'highlight.js/lib/core'
import yaml from 'highlight.js/lib/languages/yaml'
import env from 'highlight.js/lib/languages/properties'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('env', env)

watch(
  () => surveyStore.composeFile,
  () => {
    nextTick(() => {
      hljs.highlightAll()
    })
  }
)
</script>

<template>
  <div v-if="surveyStore.composeFile" class="font-mono bg-slate-100 space-y-10">
    <section class="bg-slate-200 px-10 py-5 space-y-5">
      <header class="sticky top-0 bg-slate-200 py-2 border-b-2 border-green-600">
        <h1 class="bg-slate-800 text-slate-100 text-sm py-1 px-2 rounded-lg inline-block">
          docker-compose.yml
        </h1>
      </header>

      <pre><code class="rounded-lg text-sm leading-normal language-yaml">{{ surveyStore.composeFile }}</code></pre>
    </section>

    <section class="bg-slate-200 px-10 py-5 space-y-5">
      <header class="sticky top-0 bg-slate-200 py-2 border-b-2 border-green-600">
        <h1 class="bg-slate-800 text-slate-100 text-sm py-1 px-2 rounded-lg inline-block">.env</h1>
      </header>

      <pre><code class="rounded-lg text-sm leading-normal language-yaml">{{ surveyStore.envFile }}
        </code>
      </pre>
    </section>
  </div>

  <div v-else class="bg-slate-100 flex justify-center items-center text-slate-600 text-3xl">
    Noch keine Konfiguration vorhanden
  </div>
</template>
