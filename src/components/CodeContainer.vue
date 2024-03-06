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

    <highlightjs
      :language="language"
      :code="code"
      :class="{ 'bg-yellow-100': isFlashing }"
      v-if="code"
    />

    <div v-else class="bg-gray-800 py-20 text-slate-300/20">
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="currentColor"
        class="mx-auto h-80 w-80"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
        />
      </svg>
    </div>
  </section>
</template>

<style>
@import 'highlight.js/styles/github-dark-dimmed.css';
</style>
