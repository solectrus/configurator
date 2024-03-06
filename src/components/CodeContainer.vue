<script setup lang="ts">
import { ref, watch } from 'vue'
import CopyButton from '@/components/CopyButton.vue'

interface CodeContainerProps {
  language: string
  code: string
  filename: string
}

const props = defineProps<CodeContainerProps>()
const isFlashing = ref(false)

watch(
  () => props.code,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      isFlashing.value = true
      setTimeout(() => {
        isFlashing.value = false
      }, 500)
    }
  },
)
</script>

<template>
  <section class="rounded-bl text-sm transition-colors duration-500 ease-out">
    <header
      class="sticky top-0 flex items-end justify-between bg-slate-700/80 py-3 text-center lg:px-5 lg:text-left"
    >
      <h1 class="inline-block rounded-lg bg-slate-800 px-2 py-1 text-slate-100">{{ filename }}</h1>

      <CopyButton :text="code" v-if="code" />
    </header>

    <highlightjs :language="language" :code="code" :class="{ 'bg-yellow-100': isFlashing }" />
  </section>
</template>

<style>
@import 'highlight.js/styles/github-dark-dimmed.css';
</style>
