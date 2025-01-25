<script setup lang="ts">
import CopyButton from '@/components/CopyButton.vue'
import VueMarkdown from 'vue-markdown-render'

interface MarkdownContainerProps {
  markdown: string
  filename: string
}

defineProps<MarkdownContainerProps>()
</script>

<template>
  <div v-if="markdown" class="sticky top-16 right-0">
    <div class="absolute top-4 right-4">
      <CopyButton :text="markdown" :filename="filename" />
    </div>
  </div>

  <article class="text-sm">
    <vue-markdown
      v-if="markdown"
      :source="markdown"
      class="prose prose-headings:text-inherit prose-a:text-indigo-300 prose-a:underline-offset-4 prose-strong:text-inherit prose-em:text-inherit prose-code:text-inherit prose-code:before:hidden prose-code:after:hidden prose-pre:border prose-pre:border-dashed max-w-none flex-1 bg-slate-800 p-5 text-indigo-200"
    />

    <div v-else class="flex-1 bg-gray-800" />
  </article>
</template>
