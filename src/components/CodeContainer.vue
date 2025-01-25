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
  <div v-if="code" class="sticky top-16 right-0">
    <div class="absolute top-4 right-4">
      <CopyButton :text="code" :filename="filename" />
    </div>
  </div>

  <article v-if="code" class="text-sm">
    <highlightjs :language="language" :code="code" />
  </article>
</template>

<style>
@import 'highlight.js/styles/github-dark-dimmed.css';
</style>
