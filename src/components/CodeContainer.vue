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
  <div v-if="code" class="sticky right-0 top-16">
    <div class="absolute right-4 top-4">
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
