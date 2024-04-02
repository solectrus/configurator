<script setup lang="ts">
import CopyButton from '@/components/CopyButton.vue'

interface CodeContainerProps {
  language: string
  code: string
  filename: string
}

defineProps<CodeContainerProps>()
</script>

<template>
  <article class="text-sm">
    <div class="fixed right-5 top-20">
      <CopyButton :text="code" v-if="code" />
    </div>

    <highlightjs :language="language" :code="code" v-if="code" />

    <div v-else class="flex-1 bg-gray-800"></div>
  </article>
</template>

<style>
@import 'highlight.js/styles/github-dark-dimmed.css';
</style>
